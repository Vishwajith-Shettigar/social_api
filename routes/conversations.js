const router=require("express").Router();
const conversation=require("../models/conversation")

// new converation

router.post("/",async(req,res)=>{

    const newConversation=new conversation({
        members:[req.body.senderId,req.body.receiverId]
    })

    try{
 const savedConv= await newConversation.save()

 res.status(200).json(savedConv)
    }catch(e)
    {
        res.status(500).json(e);
    }
})




// get converation of user

router.get("/:userid",async(req,res)=>{
    try{
        const conver=await conversation.find({
            members:{$in:[req.params.userid]}
        })
        res.status(200).json(conver)

    }catch(e)
    {
res.status(500).json(e)
    }
})

// get chjat online converation

router.get("/find/:firstuserid/:seconduserid",async(req,res)=>{
    try{
        const conver=await conversation.findOne({
            members:{$all:[req.params.firstuserid,req.params.seconduserid]}
        })
        res.status(200).json(conver)

    }catch(e)
    {
res.status(500).json(e)
    }
})







module.exports=router