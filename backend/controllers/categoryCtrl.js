const asyncHandler=require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");


const create=asyncHandler(async(req,res)=>{
    var {name,type}=req.body;
    if(!name||!type){
        throw new Error("Please enter all fields");
    }
    name=name.toLowerCase();
    type=type.toLowerCase();
    if(type!="income"&&type!="expense"){
        throw new Error("Invalid Category type");
    }

    const categoryExists=await Category.findOne({name:name,user:req.user});
    if(categoryExists){
        throw new Error("category exists");
    }
    const category=await Category.create({
        user:req.user,
        name,
        type,
    })
    res.json({
        "message":"category created successfully",
        category
    });
})


const lists=asyncHandler(async(req,res)=>{
    const categories=await Category.find({user:req.user});
    res.json({
        categories,
    })
})

const update=asyncHandler(async(req,res)=>{
    let {name,type}=req.body;
    const category=await Category.findById(req.params.id);
    name=name.toLowerCase();
    type=type.toLowerCase();
    if(!category||category.user.toString()!==req.user.toString()){
        throw new Error("Category not Found or User not Authorized");
    }
    let oldName=category.name;
    category.type=type;
    category.name=name;
    const updatedCategory=await category. save();
    if(oldName!==updatedCategory.name)
    {
        await Transaction.updateMany({
            user:req.user,
            category:oldName,
        },{
            $set:{category:updatedCategory.name}
        });
    }
    res.json({updatedCategory});
})

const del=asyncHandler(async(req,res)=>{
    const category=await Category.findById(req.params.id);
    if(category&&category.user.toString()===req.user.toString()){
        await Transaction.updateMany({user:req.user,category:category.name},{
            $set:{category:"Uncategorized"}
        });
        await Category.findByIdAndDelete(req.params.id);
        res.json({"message": "category removed"})
    }
    else
    {
        res.json({"message":"category not found or user not authorized"});
    }
})





module.exports={
    create,
    lists,
    update,
    del,
}