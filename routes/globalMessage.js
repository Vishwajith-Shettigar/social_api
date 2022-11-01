const router=require("express").Router();
const globalMessages=require('../models/globalMessages')
// new gm

router.post("/",async(req,res)=>{

    try{

      const conver =await globalMessages.find();
    
        if(conver.length>100)
        {
          
            const lol= await globalMessages.find({}).limit(conver.length-100);
           lol.forEach(async(doc)=>{

             await globalMessages.remove({_id:doc._id})
           })
        }

    }catch(e){

    }

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

    }catch(e)
    {
       
res.status(500).json(e)
    }
})



module.exports=router