const router=require("express").Router();
const globalMessages=require('../models/globalMessages')
// new gm

router.post("/",async(req,res)=>{

   const globalMessage= new globalMessages(req.body);
   try{
  const result= await globalMessage.save();
  res.status(200).json(result);
   }catch(err){


   }


})




// get gme of user

router.get("/",async(req,res)=>{
   
    try{
        const conver=await globalMessages.find()
       
        res.status(200).json(conver)
        if(conver.length>1000)
        {
            
        }

    }catch(e)
    {
       
res.status(500).json(e)
    }
})



module.exports=router