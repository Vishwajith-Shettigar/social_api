const express=require("express");
const app= express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth");
const postRoute=require("./routes/post")
const convRoute=require("./routes/conversations")
const mesgRoute=require("./routes/messages")
const globalMRoute=require("./routes/globalMessage")
const cors=require("cors")
const multer=require("multer");
const path=require("path");
// const { storage } = require('debug/src/browser');
dotenv.config();
app.use(cors());



console.log(__dirname)
mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true

},()=>{

    console.log("db connected")
})

app.use("/images",express.static(path.join(__dirname,"public/images")))

app.use(express.json())
app.use(morgan("common"))
app.use(helmet())

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)
app.use("/api/conversation",convRoute);
app.use("/api/message",mesgRoute);
app.use("/api/globalm",globalMRoute);
const  storage=multer.diskStorage({

    destination:function(req,file,cb){
        console.log("yoo")
       console.log(req.body.notapost)
       if(!req.body.notapost)
        cb(null,path.join(__dirname,"./public/images/post"))
        else
        cb(null,path.join(__dirname,"./public/images/person"))
       
    },
    filename:function(req,file,cb){
      
        cb(null,req.body.name )
    }
})
const upload=multer({storage:storage, limits: { fieldSize: 10 * 1024 * 1024 }});
app.post("/api/upload", upload.single("file"),(req,res)=>{

    try{
        console.log("Upload")
       console.log(req.body)

        return res.status(201).json("uploaded successfullly")
    }catch(e)
    {
        console.log(e)
 return res.status(500).json(e);
    }
})
// req



app.listen(5000,()=>{


    console.log("live")
})