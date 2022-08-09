import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : 'String',
        required : true
    },
    username : {
        type : 'string',
        required : true
    },
    password : {
        type : 'String',
        required : true
    },

    department : {
        type : 'String',
        requried : true
    },
    description : {
        type : 'String',
        required : 'true'
    },
    year : {
        type : 'Number',
        required : true
    },
    image : {
        data : Buffer,
        contentType : 'String'
    }
});

const User = new mongoose.model('User', userSchema);

export default User;