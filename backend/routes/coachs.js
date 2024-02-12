const express = require("express");
const coachRouter = express.Router();
const {cteateNewPlane,AddUserToPrivate,removeUserFromPrivate,getAllPlanByCoachId,getAllUserByPlanId}=require('../controllers/coachs')
const authentication=require('../middleware/authentication')
coachRouter.post('/plan',authentication,cteateNewPlane)
coachRouter.post('/user',authentication,AddUserToPrivate)
coachRouter.put('/remove_user',authentication,removeUserFromPrivate)
coachRouter.get('/plan',authentication,getAllPlanByCoachId)
coachRouter.get('/user',authentication,getAllUserByPlanId)
module.exports=coachRouter