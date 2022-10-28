const mongoose=require("mongoose");

const postSchema=mongoose.Schema({

    userid:{
        type:String,
        require:true,
       
          
    },
   
    desc:{
        type:String,
        max:5000
    },
    img:{
        type:String,

    },
    likes:{
        type:Array,
        default:[]
    },
    anonymous:{
        type:Boolean,
        default:false
    },
    comments:[
       { userid:String,
        text:String,}
    ]

},
{timestamps:true}
)


module.exports=mongoose.model("posts",postSchema)