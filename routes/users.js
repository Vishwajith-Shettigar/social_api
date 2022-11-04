const router=require("express").Router()
const bcrypt=require("bcrypt");
const { json } = require("express");
const user = require("../models/user");
//update
router.post("/:id",async(req,res)=>{
try{  
    const u=await user.findById(req.params.id)
  if(req.body.password)
  {
  
    const validPassword = await bcrypt.compare(
        req.body.oldpassword,
        u.password
      );

      if(!validPassword)
      {
          return res.status(404).json("wrong old password")
      }else{
     
        const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
          u.password=req.body.password;
      }
    
  }

  if(req.body.username)
  {
    console.log(req.body.username)
u.username=req.body.username;
  }
  if(req.body.email)
  u.email=req.body.email;
  if(req.body.desc)
 { 
    u.desc=req.body.desc;
console.log(req.body.desc)
}
  if(req.body.city)
  {
    console.log(req.body.city)
    u.city=req.body.city;
}
  if(req.body.from)
  u.from=req.body.from;
  if(req.body.profilePicture)
  u.profilePicture=req.body.profilePicture;
  if(req.body.coverPicture)
  u.coverPicture=req.body.coverPicture;
  if(req.body.relationship)
  u.relationship=req.body.relationship;

 const result=await user.findByIdAndUpdate(req.params.id,u)
 console.log(u)
 console.log(result)
 res.status(200).json(result)

}
catch(e) {{
    res.status(500).json(e)
}}
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

router.get("/getuserrecom/:id",async(req,res)=>{
try{
    
    const Currentuser=await user.findById(req.params.id);
    console.log(Currentuser)
    let userFriends=[];
    for (i of Currentuser.following){
           userFriends.push(i);

    }
    for (i of Currentuser.followers){
        userFriends.push(i);
        
 }
console.log(userFriends);




userFriends=userFriends.filter((item,index,userFriends)=>{

    return userFriends.indexOf(item)===index;

})


  


let userfrienFriends=[];
 for(i of userFriends){

        const friend= await user.findById(i);
        friend.followers.map((ff)=>{
            userfrienFriends.push(ff)
        })
        friend.following.map(async(ff)=>{
            userfrienFriends.push(ff);
        })
    

}

userfrienFriends=userfrienFriends.filter((item,index,userFriends)=>{

    return userfrienFriends.indexOf(item)===index;

})

userfrienFriends=userfrienFriends.filter((f)=>{
    return  userFriends.includes(f)===false && f!=req.params.id
})



const recomFriends=await Promise.all(

    userfrienFriends.map(  friendid=>{

        return  user.findById(friendid)

})
)

if(recomFriends.length<10)
{
    
    const u=await user.find();

    for(i of u)
    recomFriends.push(i)

}




 res.status(200).json(recomFriends);
}

catch(e){
    res.status(500).json(e);
}
    
})

module.exports=router;
