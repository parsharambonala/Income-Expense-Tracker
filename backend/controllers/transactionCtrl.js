const  asyncHandler=require("express-async-handler");
const Transaction = require("../model/Transaction");



const create=asyncHandler(async(req,res)=>{
    const {type,category,amount,date,description}=req.body;
    if(!amount||!type||!date){
        throw new Error("Type, amount and date are required");
    }
    const transaction = await Transaction.create({
        user:req.user,
        type,
        category,
        amount,
        date,
        description,
    })
    res.json({transaction});
})

const lists=asyncHandler(async(req,res)=>{
    const transactions=await Transaction.find({user:req.user});
    res.json(transactions);
})

const getTransaction=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const transaction=await Transaction.findById(id);
    res.json(transaction);
})

const getFilteredTransactions=asyncHandler(async(req,res)=>{
    const {startDate, endDate, type, category}=req.query;
    let filters={user:req.user};
    if(startDate){
        filters.date={...filters.date, $gte: new Date(startDate)};
    }
    if(endDate){
        filters.date={...filters.date, $lte: new Date(endDate)};
    }
    if(type){
        filters.type=type;
    }
    if(category)
    {
        if(category==="All")
        {

        }
        else
        {
            filters.category=category;
        }
    }    
    const transactions=await Transaction.find(filters).sort({date:-1});
    res.json({transactions});
})


const update=asyncHandler(async(req,res)=>{
    const transaction=await Transaction.findById(req.params.id);
    if(transaction&&transaction.user.toString()===req.user.toString())
    {
        (transaction.type=req.body.type||transaction.type),
        (transaction.category=req.body.category||transaction.category),
        (transaction.amount=req.body.amount||transaction.amount),
        (transaction.date=req.body.date||transaction.date),
        (transaction.description=req.body.description||transaction.description)
        const updatedTransaction=await transaction.save();
        res.json({updatedTransaction});
    }    
    else
    {
        throw new Error("Not authorized");
    }
})

const del=asyncHandler(async(req,res)=>{
    const transaction=await Transaction.findById(req.params.id);
    if(transaction&&transaction.user.toString()===req.user.toString())
    {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({
            message:"transaction deleted",
        })
    }  
    else
    {
        throw new Error("Not authorized");
    }  
})




module.exports={
    create,
    lists,
    getFilteredTransactions,
    update,
    del,
    getTransaction,
}