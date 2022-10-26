const router=require("express").Router();
const message=require("../models/message")

// new mesage

router.post("/",async(req,res)=>{

    const newMessage= new message(req.body)
try{
    const savedMessage=await newMessage.save();

res.status(200).json(savedMessage)
}catch(e)
{
    res.status(500).json(e)
}

})




// get converation of user

router.get("/:conversationId",async(req,res)=>{
    try{
 const mesages= await message.find({
    conversationId:req.params.conversationId
 })
 res.status(200).json(mesages)

    }
    catch(e)
    {

    }
})








module.exports=router