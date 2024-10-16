const express=require("express");
const isAuthenticated = require("../middlewares/isAuth");
const {create, lists, update, del } = require("../controllers/categoryCtrl");




const categoryRouter=express.Router();

categoryRouter.post("/api/v1/categories/create",isAuthenticated,create);

categoryRouter.get("/api/v1/categories/lists",isAuthenticated,lists);

categoryRouter.put("/api/v1/categories/update/:id",isAuthenticated,update);

categoryRouter.delete("/api/v1/categories/delete/:id",isAuthenticated,del);

module.exports=categoryRouter;


