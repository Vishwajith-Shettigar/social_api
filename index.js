const express=require("express");
const app= express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth");
const postRoute=require("./routes/post")
dotenv.config();



mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true

},()=>{

    console.log("db connected")
})


app.use(express.json())
app.use(morgan("common"))
app.use(helmet())

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)
// req

app.get("/",(req,res)=>{

    console.log("homepage")
})

app.listen(3000,()=>{


    console.log("live")
})