const asyncHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User = require("../model/User");


const register= asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        throw new Error("Please enter all fields");
    }

    const userFound= await User.findOne({email});
    
    if(userFound){
        throw new Error("User exists");
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const userCreated= await User.create({
        email,
        username,
        password:hashedPassword,
    })
    
    res.json({
        username:userCreated.username,
        email:userCreated.email,
        id:userCreated._id,
    });
})

const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new Error("Please enter all fields");
    }
    const userFound=await User.findOne({email});
    if(!userFound){
        throw new Error("Invalid login credentials");
    }
    const isMatch=await bcrypt.compare(password,userFound.password);
    if(!isMatch){
        throw new Error("Invalid login credentials");
    }
    const token=jwt.sign({id:userFound._id},'loginKey',{
        expiresIn:"30d",
    });
    res.json({
        message:"Login success",
        token,
        id:userFound._id,
        email:userFound.email,
        username:userFound.username,
    })
})

const profile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user);
    if(!user)
        throw new Error("User not Found");
    res.json({
        username:user.username,
        email:user.email,
    })
})

const changePassword= asyncHandler(async(req,res)=>{
    const {password}=req.body;
    if(!password)
        throw new Error("Enter new password");
    const user=await User.findById(req.user);
    if(!user){
        throw new Error("User not found");
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    user.password=hashedPassword;
    await user.save();
    res.json({
        message:"password changed successfully",
    })
})

const updateProfile=async(req,res)=>{
    const {email,username}=req.body;
    const updatedUser=await User.findByIdAndUpdate(req.user,{
        username,
        email
    },{
        new:true,
    });
    res.json({
        message:"User profile updated",
    })
}

module.exports={
    register,
    login,
    profile,
    changePassword,
    updateProfile,
}