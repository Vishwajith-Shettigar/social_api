const router=require("express").Router();
const post=require("../models/post");
const user = require("../models/user");

//create post
router.post("/",async(req,res)=>{
   const newPost=new post(req.body);
try{
    const savedpost=await newPost.save();
    res.status(200).json(savedpost)
}catch(e)
{
    res.status(500).json(e);
}

})


//update
router.put("/:id",async(req,res)=>{

    try{
    const updatePost=await post.findById(req.params.id);

    if(updatePost.userid===req.body.userid)
    {
 await post.updateOne({$set:req.body});
 res.status(200).json("updated")

    }else{
        res.status(403).json("You cant update others post")
    }
}
catch(e)
{
    res.status(500).json(e)
}
})


//delete

router.post("/:id",async(req,res)=>{

    try{
    const deletingpost=await post.findById(req.params.id);
console.log(deletingpost.userid)
console.log(req.body)
    if(deletingpost.userid===req.body.userid)
    {
 await post.findByIdAndDelete(req.params.id);
 res.status(200).json("deleted")

    }else{
        res.status(403).json("You cant delete others post")
    }
}
catch(e)
{
    res.status(500).json(e)
}
})

// like /dislike a post

router.put("/:id/like",async(req,res)=>{

    console.log("likes", req.body.userid, req.params.id)
    try{
        const newPost=await post.findById(req.params.id);
        console.log(newPost)
        if((!newPost.likes.includes(req.body.userid)))
        {
            console.log("not",newPost.likes.includes(req.body.userid))
                await post.findByIdAndUpdate(req.params.id,{$push:{likes:req.body.userid}})
                res.status(201).json("liked")

        }else{
            await post.findByIdAndUpdate(req.params.id,{$pull:{likes:req.body.userid}})
            res.status(201).json("disliked")
        }

    }catch(e)
    {
            res.status(500).json(e);
    }
})


// get a post

router.get("/:id",async(req,res)=>{

    try{
        const newPost= await post.findById(req.params.id);
        res.status(200).json(newPost)

    }
    catch(e)
    {
        res.status(500).json(e)
    }
})



//get timeline post

router.get("/timeline/:userid",async(req,res)=>{
    
console.log(req.params.userid)
    let postArray=[];
    try{
   const currentUser=await user.findById(req.params.userid);
   const userPost=await post.find({userid:currentUser._id});
const friendPost= await Promise.all(
    currentUser.following.map((friendid=>{
 return post.find({userid:friendid});  
    }))
);
res.status(200).json(userPost.concat(...friendPost));

    }catch(e)
    {
res.status(500).json(e);
    }
})

// get users all post
router.get("/profile/:username",async(req,res)=>{

    console.log("debug")
    console.log(req.params.username , ";ol")
    let postArray=[];
    try{
 const ourUser=await user.findOne({username:req.params.username});
 const posts=await post.find({userid:ourUser._id});

res.status(200).json(posts);

    }catch(e)
    {
res.status(500).json(e);
    }
})


//update comment

router.post("/comment/:id",async(req,res)=>{
    try{
        console.log("kol")
       const n= await post.findByIdAndUpdate(req.params.id,{$push:{comments:req.body}})

        res.status(201).json("success")
    }catch(e)
    {
        res.status(400).json(e)
    }
})


router.post("/deleteComment/:id",async(req,res)=>{

    try{
        if(req.body.userid===req.body.postuserid || req.body.userid===req.body.commentuserid)
        {
            await post.findByIdAndUpdate(req.params.id,{$pull:{comments:{_id:req.body.commentid}}})
            res.status(200).json("deleted ")
            
        }else{
            res.status(400).json("not allowed")
        }

    }catch(e)
    {
        res.status(500).json(e)
    }
})

router.get("/getComments/:id",async(req,res)=>{

    try{
           const result=await post.findById(req.params.id);
           console.log(result);
         const  {comments,...others}=result._doc;
           res.status(200).json(comments);
    }catch(e)
    {
        res.status(500).json(comments);
    }
})

module.exports=router;



