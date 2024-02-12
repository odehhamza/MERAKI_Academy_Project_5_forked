const pool = require("../models/db");

const cteateNewPlane = (req, res) => {
  const { name, description, numOfMonth } = req.body;
  const coach_id = req.token.userId;
  const value = [name, description, numOfMonth, coach_id];
  const query = `INSERT INTO coach_plan (name,description,numOfMonth,coach_id) VALUES ($1,$2,$3,$4) RETURNING *;`;
  const query_1=`SELECT * FROM coach_plan WHERE coach_id=$4 RETURNING *;`
  pool.query(query_1,value).then((result)=>{
    if(result.rows.length<3){
       pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Plane created successfully",
        Plan: result.rows,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Server error",
      });
    });
    }else{
      res.status(201).json({
        success: false,
        message: "You Can't Add More Than 3 Plans",
      })
    }
  }).catch((err) => {
    res.status(400).json({
      success: false,
      message: "Server error",
    });
  });

 
};
const getAllPlanByCoachId =(req,res)=>{
  const coach_id=req.token.userId
  const value=[coach_id]
  const query=`SELECT * FROM coach_plan WHERE coach_id=$1 RETURNING *; `
  pool.query(query,value).then((result)=>{
    if(!result.rows.length){
      res.status(201).json({
        success:true,
        message:`All Plans For Coach_id=${coach_id}`,
        plans:result.rows
      })
    }else{
      res.status(404).json({
        success:false,
        message:`NO Plans For Coach_id=${coach_id} Yet`
      })
    }
  }) .catch((err) => {
    res.status(400).json({
      success: false,
      message: "Server error",
    });
  });

}
const AddUserToPrivate = (req, res) => {
  const { plan_id, coach_id,numOfMonth} = req.body;
  const endSub = `CURRENT_TIMESTAMP + INTERVAL '${numOfMonth} months'`;
  const user_id =req.token.userId;
  const value = [plan_id, coach_id, user_id];
  const query = `INSERT INTO room_user (plan_id, coach_id, user_id, endSub) 
  VALUES ($1, $2, $3,${endSub}) 
  RETURNING *;`;
  const query_1=`SELECT user_id FROM room_user 
  WHERE user_id=$3 AND plan_id=$1`
  pool.query(query_1,value).then((result)=>{
if(!result.rows.length){
  res.status(201).json({
    success : false,
    message : `The User Already Exist In This Plan`
})
}else{
  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "User Add successfully",
        user: result.rows,
      });
    })
}
  }).catch((err) => {
      res.status(400).json({
        success: false,
        message: "Server error",
        err
      });
    });
};
const getAllUserByPlanId=(req,res)=>{
  const plan_id=req.body;
  const value=[plan_id];
  const query=`SELECT room_user.user_id, users.firstName, room_user.endSub
  FROM room_user
  JOIN users ON room_user.user_id = users.id
  WHERE room_user.plan_id = 1;
  `
  pool.query(query,value).then((result)=>{
    if(!result.rows.length){
      res.status(201).json({
        success:true,
        message:`All Users IN Plan_id=${plan_id}`,
        users:result.rows
      })
    }else{
      res.status(404).json({
        success:false,
        message:`NO Users IN Plan_id=${plan_id} Yet`
      })
    }
  }) .catch((err) => {
    res.status(400).json({
      success: false,
      message: "Server error",
    });
  });
}
const removeUserFromPrivate = (req, res) => {
  const {user_id,coach_id} = req.body;
  const value = [user_id,coach_id];
  const query = `UPDATE room_user SET is_delete=1 WHERE user_id=$1 AND coach_id=$2`;
  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "User Deleted successfully",
        user: result.rows,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Server error",
      });
    });
};
module.exports = {
  cteateNewPlane,
  AddUserToPrivate,
  removeUserFromPrivate,
  getAllPlanByCoachId,
  getAllUserByPlanId
};
