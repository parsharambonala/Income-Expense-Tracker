const errorHandler=(err,req,res,next)=>{
    res.status(500);
    res.json({
        message:err.message,
        stack:err.stack,
    });
};

module.exports=errorHandler;