const router=require("express").Router()
const bcrypt=require("bcrypt");
const { json } = require("express");
const user = require("../models/user");
//update
router.put("/:id",async(req,res)=>{

   if(req.body.userid===req.params.id || req.body.isAdmin)
   {
    if(req.body.password)
    {
        try{
          
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
  

        }catch(e)
        {
                return res.status(500).json(e);
        }

    }
    try{
        const updatedUser=await user.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        })
       
        return res.status(200).json("Account has been updated");
    }catch(e)
    {
        return res.status(500).json(e);
    }

   }else{
    res.status(401).json("You can update only your account")
   }
})

//delete

router.delete("/:id",async(req,res)=>{

    if(req.body.userid===req.params.id || req.body.isAdmin)
    {
    
     try{
         const deletedUser=await user.findByIdAndDelete(req.params.id)
        
         return res.status(200).json("Account has been deleted");
     }catch(e)
     {
         return res.status(500).json(e);
     }
 
    }else{
     res.status(401).json("You can delete only your account")
    }
 })


//get user

router.get("/",async(req,res)=>{

    const userid=req.query.userid;
    const username=req.query.username;

    try{

  const newuser= userid
  ? await user.findById(userid) 
  : await user.findOne({username:username})
  
  const {password,updatedAt,...others}=newuser._doc;
console.log(others)
  res.status(200).json(others);
    }catch(e)
    {
        console.log(e)
    }
})

//get friends

router.get("/friends/:userid", async(req,res)=>{

    try{

        const ourUser= await user.findById(req.params.userid);

        const friends=await Promise.all(

            ourUser.following.map(  friendid=>{

                return  user.findById(friendid)

    })
  

        )  
       
        let friendList=[];

        friends.map(friend=>{

            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture})
            
        })
console.log("---------------------------")
console.log(friendList)
         res.status(200).json(friendList)

    }catch(e)
    {
        res.status(500).json(e)

    }

})

router.put("/:id/follow",async(req,res)=>{
    
    
    if(req.body.userid!=req.params.id)
    {
         try{

            const targetUser=await user.findById(req.params.id);
            const currentUser=await user.findById(req.body.userid);

            if(!targetUser.followers.includes(req.body.userid))
            {
              
                
                        await targetUser.updateOne({$push:{followers:req.body.userid}});
                        await currentUser.updateOne({$push:{following:req.params.id}})
                        res.status(200).json("user has been followed");
            }else{
                res.status(403).json("Already following")
            }

         }catch(e)
         {
            res.status(500).json(e)
         }
    }else{
        res.status(403).json("You cant follow yourself")
    }
})


router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userid!=req.params.id)
    {
         try{

            const targetUser=await user.findById(req.params.id);
            const currentUser=await user.findById(req.body.userid);

            if(targetUser.followers.includes(req.body.userid))
            {
                        await targetUser.updateOne({$pull:{followers:req.body.userid}});
                        await currentUser.updateOne({$pull:{following:req.params.id}})
                        res.status(200).json("user has been unfollowed");
            }else{
                res.status(403).json(" you dont follow this user")
            }

         }catch(e)
         {
            res.status(500).json(e)
         }
    }else{
        res.status(403).json("You cant unfollow yourself")
    }
})

router.get("/getuserrecom",async(req,res)=>{

    
})

module.exports=router;
