const express=require("express");
const { register, login, profile, changePassword, updateProfile } = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");

const userRouter=express.Router();

userRouter.post("/api/v1/users/register",register);

userRouter.post("/api/v1/users/login",login);

userRouter.get("/api/v1/users/profile",isAuthenticated, profile);

userRouter.put("/api/v1/users/change-password",isAuthenticated, changePassword);

userRouter.put("/api/v1/users/update-profile",isAuthenticated, updateProfile);

module.exports= userRouter;