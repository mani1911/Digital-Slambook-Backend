import Express from "express";
import bcrypt from 'bcrypt';
const userRoute = Express.Router();
import User from '../models/user.js';
import multer from "multer";
import fs from 'fs';

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, 'uploads')
    },
    filename : (req,file, cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage  :storage});

userRoute.get('/',async (req,res)=>{
    try{
        const userArray = await User.find();
        res.json({data : userArray});
    }
    catch(e){
        console.log(e.message);
    }

})
userRoute.post('/reg',upload.single('image'), async (req,res)=>{
    try{
        const { username, name, password , description, department ,year} = req.body;
        const image = {
            data : fs.readFileSync('uploads/' + req.file.filename),
            contentType : "image/png"
        }
        const existing = await User.find({username});
        let message = '';
        let status = 0;
        if(existing.length > 0){
            message = 'User Already Exists';
        }
        else if(password.length < 8){
            message = 'Password requires Minimum 8 Characters';
        }
        else if(!username || !name || !password || !description || !department || !year){
            message = 'Input Field cannot be Empty';
        }
        else{
            const hash = await bcrypt.hash(password,12);
            const newUser = new User({username,password : hash,name, description, department, year, image});
            await newUser.save();
            message = 'User Registered';
            status = 1;
        }
        res.json({status, message});
    }
    catch(error){
        console.log(error.message);
    }
});
    
userRoute.post('/login', async (req,res)=>{
    const { username , password } = req.body;
    try{
        if(!username || !password){
            res.json({status : 0, message : 'No Input Field can be Empty'});
            return;
        }
        let message = 'Incorrect Username or Password';
        let status = 0;
        if(!username || !password){
            message = 'No Input Field can be Empty';
        }
        const user = await User.findOne({username});
        if(user){
            const isValidUser = await bcrypt.compare(password, user.password);
            if(isValidUser){
                message = 'Logged in Successfully';
                status = 1;
            }
        }
        res.json({status,message,user})
    }
    catch(e){
        console.log(e.message)
    }

});

userRoute.post('/logout', (req,res)=>{
    try{
        res.json({message : 'Successfully Logged Out'});
        
    }
    catch(e){
        console.log(e.message);
    }
    
});

userRoute.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.find({_id : id});
        res.json({user});
    }
    catch(e){
        console.log(e.message);
    }

})

userRoute.post('/edit',upload.single('image'),async (req,res)=>{
    try{
        const {id,name,department, description ,year} = req.body;
        const image = {
            data : fs.readFileSync('uploads/' + req.file.filename),
            contentType : "image/png"
        }
        if(!id || !name || !department || !description || !year){
            return;
        }
        if(image){
            const user = await User.findOneAndUpdate({_id :id}, {name, department, description, year, image});
        }
        else{
            const user = await User.findOneAndUpdate({_id :id}, {name, department, description, year});
        }
        res.json({message : 'Changes Successfully Updated'});
    }
    catch(e){
        console.log(e.message);
    }
})

export default userRoute;
