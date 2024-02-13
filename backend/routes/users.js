const express = require("express");

const { register, login,AddUserinfo,getAllUsers ,getAllCoachs,getUserInfoById,updateUserInfo,getUserInfoByUserId} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/info/create",AddUserinfo)
usersRouter.get("/", getAllUsers)
usersRouter.get("/coachs", getAllCoachs)
//usersRouter.get("/info/:id",getUserInfoById)
usersRouter.put('/info/update', updateUserInfo)
usersRouter.get('/info',getUserInfoByUserId)
module.exports = usersRouter;
