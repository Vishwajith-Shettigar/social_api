const mongoose=require("mongoose");

const ConversationSchema=mongoose.Schema(
    {

        members:{
            type:Array,

        }

   
},
{timestamps:true}
)


module.exports=mongoose.model("conversations",ConversationSchema)