import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user : {type : 'String', required : true},
    userID : { type: 'String', required : true },
    parentID : {type : 'String', required : true},
    time : { type : Date, default: Date.now() },
    comment : {type : 'String', required : true}
});

const Comments = new mongoose.model('Comments', commentSchema);

export default Comments;