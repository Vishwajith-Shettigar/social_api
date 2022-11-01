const mongoose=require("mongoose");

const globalMessageSchema=mongoose.Schema(
    {

      

                userid:String,
                username:String,
                userImg:String,
                text:String,
                
      
   
},
{timestamps:true}
)


module.exports=mongoose.model("globalMessages",globalMessageSchema)