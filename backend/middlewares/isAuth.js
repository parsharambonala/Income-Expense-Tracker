const jwt=require("jsonwebtoken");

const isAuthenticated=(req,res,next)=>{
    const header=req.headers;
    const token=header?.authorization?.split(" ")[1];
    const verifyToken=jwt.verify(token,"loginKey",(err,decoded)=>{
        if(err)
            return false;
        else
            return decoded;
    });
    if(verifyToken)
    {
        req.user=verifyToken.id;
        next();
    }
    else
    {
        const err=new Error("Token expired, login again");
        next(err);
    }   
};

module.exports=isAuthenticated;