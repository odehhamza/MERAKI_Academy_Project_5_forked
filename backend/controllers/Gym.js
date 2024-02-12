
const pool = require("../models/db");

const createGym = (req,res)=>{
    const userId = 1;
    const {name, description} = req.body;
    const provider = [name, description, userId];
    pool.query(`INSERT INTO gyms (name , description, owner_id) VALUES ($1, $2, $3)`, provider).then((result) => {
        res.status(201).json({
            success : true,
            message : "Gym created successfully",
            gym : result.rows
        })
    }).catch((err) => {
        res.status(500).json({
            success : false,
            message : "Server error",
            error : err.message
        })
    });
    
}

const getAllGym = (req, res)=>{
    pool.query(`SELECT * FROM gyms`).then((result) => {
        res.status(201).json({
            success : true,
            message : `All Gym`,
            gym : result.rows
        })
    }).catch((err) => {
        res.status(500).json({
            success : false,
            message : "Server error",
            error : err.message
        })
    });
}

const getGymByOwner = (req,res)=>{
    const user_id = req.params.ownerId;
    pool.query(`SELECT * FROM gyms WHERE owner_id = $1`, [user_id]).then((result)=>{
        if(result.rows.length === 0){
            return res.status(201).json({
                success : true,
                message : `The User Does not have Gym`
            })
        }
        res.status(201).json({
            success : true,
            message : `All Gym By Owner`,
            result : result.rows
        })
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message : `Server Error`,
            error : err
        })
    })
}

const createPlan = (req,res)=>{
    const gym_id = req.params.gymid;
    const {name, description, numOfMonth, price} = req.body;
    const provider = [name,description, numOfMonth,price, gym_id];

    pool.query(`INSERT INTO gym_plan (name,description, numOfMonth,price, gym_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,provider).then((result)=>{
        res.status(201).json({
            success : true,
            message : `Created Plan For Gym Successfully`,
            plan : result.rows
        })
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message : `Server error`,
            erorr : err.message
        })
        
    });
}

const getPlanByGymId = (req,res) =>{
    const gymId = req.params.gymid;
    pool.query(`SELECT * FROM gym_plan INNER JOIN gyms ON gym_plan.gym_id = gyms.id WHERE gym_plan.gym_id = $1`,[gymId]).then((result) => {
        res.status(201).json({
            success : true,
            message : `All Plan For Gym`,
            plans : result.rows
        })
    }).catch((err) => {
        res.status(201).json({
            success : false,
            message : `Server Error`,
            error : err
        })
    });
}   

const addNewUserInGym = (req,res)=>{
    const {gym_id, user_id} = req.body;
    const provider = [user_id, gym_id]; //////////
    pool.query(`SELECT user_id FROM gym_user WHERE user_id = $1`,provider).then((result)=>{
        if(result.rows.length !== 0 ){
            res.status(201).json({
                success : true,
                message : `The User Already Exist in Gym`
            });
            
        }else{
            pool.query(`SELECT coach_id FROM gym_coach WHERE coach_id = $1`, provider).then((result)=>{
                if(result.rows.length !== 0){
                    res.status(201).json({
                        success : false,
                        message : `The User Already Exist Coach In Gym`
                    })
                }else{
                    pool.query(`INSERT INTO gym_user(user_id, gym_id, plan_id) VALUES ($1,$2,plan_id) RETURNING *`, provider).then((result) => {
                        res.status(201).json({
                            success : true,
                            message : "User Add Successfully In Gym",
                            result : result.rows
                        })
                    }).catch((err) => {
                        res.status(500).json({
                            success : false,
                            message : `Server error`,
                            error : err.message
                        });
                    });
                }
            })

        }
        
    })

}

const getAllUserInGym = (req,res)=>{
    const gym_id = 2;
    const provider = [gym_id]
    pool.query(`SELECT * FROM gym_user INNER JOIN users ON gym_user.user_id = users.id WHERE gym_id = $1`, provider).then((result) => {
        res.status(200).json({
            success : true,
            message : `All User In Gym`,
            result : result.rows
        });
    }).catch((err) => {
        res.status(500).json({
            success : false,
            message : `Error server`,
            err
        });
    });
}

const deleteUserInGym = async(req,res)=>{
    const {gym_id, user_id} = req.body;
    const provider = [gym_id,user_id];
    await pool.query(`UPDATE gym_user SET is_delete=1 WHERE user_id = $2 AND gym_id = $1`, provider).then(async(result) => {
        res.status(201).json({
            success : true,
            message : `User Delete Successfully In Gym`,
            result : result
        });

        
    }).catch((err) => {
        res.status(500).json({
            success : false,
            message : `Server Error`,
            error : err.message
        });
    });
}

const addNewCoachInGym = (req,res) =>{
    const {gym_id, coach_id} = req.body;
    const provider = [gym_id, coach_id];
    pool.query(`DELETE FROM gym_user WHERE user_id = $1`,[coach_id]).then((result) => {
        pool.query(`INSERT INTO gym_coach (gym_id, coach_id) VALUES ($1,$2)`, provider).then((result) => {
            res.status(201).json({
                success : true,
                message : `Coach Add Successfully In Gym`,
                result : result.rows
            });
        }).catch((err) => {
            res.status(500).json({
                success : false,
                message : `Server Error`,
                error : err.message
            });
        });
    }).catch((err) => {
        res.status(500).json({
            success : false,
            message : `Server Error`,
            error : err.message
        });
    });
}

const getAllCoachInGym = (req,res)=>{
    const gym_id = 2;
    const provider = [gym_id];
    pool.query(`SELECT * FROM gym_coach INNER JOIN users ON gym_coach.coach_id = users.id WHERE gym_coach.gym_id = $1`, provider).then((result) => {
        res.status(200).json({
            success : true,
            message : `All Coach In Gym`,
            result : result.rows
        });
    }).catch((err) => {
        res.status(500).json({
            success : false,
            message : `Error server`,
            err
        });
    });
}

const deleteCoachInGym = async(req,res)=>{
    const {gym_id, coach_id} = req.body;
    const provider = [gym_id,coach_id];
    await pool.query(`UPDATE gym_coach SET is_delete=1 WHERE coach_id = $2 AND gym_id = $1`, provider).then(async(result) => {
        res.status(201).json({
            success : true,
            message : `Coach Delete Successfully In Gym`,
            result : result
        });

        
    }).catch((err) => {
        res.status(500).json({
            success : false,
            message : `Server Error`,
            error : err.message
        });
    });
}

module.exports = {
    createGym,
    addNewCoachInGym,
    addNewUserInGym,
    getAllGym,
    getAllUserInGym,
    getAllCoachInGym,
    deleteUserInGym,
    deleteCoachInGym,
    createPlan,
    getGymByOwner,
    getPlanByGymId
}