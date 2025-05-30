const express=require("express");
const mongoose=require("mongoose");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const cors=require("cors");
const app=express();

mongoose
.connect("MongoDB Connection String")
.then(()=>{console.log("DB connected successfully")})
.catch((e)=>console.log(e.message));

const corsOptions={
    origin:["http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use(express.json());



app.use('/',userRouter);
app.use('/',categoryRouter);
app.use('/',transactionRouter);


app.use(errorHandler)

const PORT=process.env.PORT||8000;

app.listen(PORT,()=>console.log(`server is running on... ${PORT}`));