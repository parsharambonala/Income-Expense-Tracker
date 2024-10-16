const express=require("express");
const isAuthenticated = require("../middlewares/isAuth");
const { create, lists, getFilteredTransactions, update, del, getTransaction } = require("../controllers/transactionCtrl");



const transactionRouter=express.Router();

transactionRouter.post("/api/v1/transactions/create",isAuthenticated,create);

transactionRouter.get("/api/v1/transactions/lists",isAuthenticated,getFilteredTransactions);

transactionRouter.put("/api/v1/transactions/update/:id",isAuthenticated,update);

transactionRouter.delete("/api/v1/transactions/delete/:id",isAuthenticated,del);

transactionRouter.get("/api/v1/transactions/get-transaction/:id",isAuthenticated,getTransaction);

module.exports=transactionRouter;


