import Express  from "express";
const commentRoute = Express.Router();
import Comments from '../models/comments.js';

commentRoute.get('/:id',async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    const comments = await Comments.find({parentID : id});
    res.json({comments});
});

commentRoute.post('/new', async (req,res)=>{
    try{
        const {user, parentID, userID , comment} = req.body;
        const newComment = new Comments({user, parentID, userID, comment, time : Date.now()});
        await newComment.save();
        res.json({message : 'Comment Added'});
    }
    catch(e){
        console.log(e.message);
    }


})

commentRoute.post('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        await Comments.findOneAndDelete({_id : id});
        res.json({message : 'Comment Deleted'});
    }
    catch(e){
        console.log(e.message);
    }

})

export default commentRoute;