import Express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from './routes/userroute.js';
import commentRoute from './routes/commentroute.js';
import dotenv from 'dotenv';

const app = Express();
const Port = process.env.PORT || 3002;
const URL = 'mongodb+srv://mani19112003:mani19112003@cluster0.bj3en.mongodb.net/?retryWrites=true&w=majority';

app.use(Express.json());
app.use(cors());

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use('/user', userRoute);
  app.use('/comments', commentRoute);


mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>{
    app.listen(Port, ()=>{
        console.log(`Connection Established : ${Port}`);
    })
})
.catch(e=>{
    console.log(e.message);
});

app.get('/health', (req,res)=>{
    res.send('Healthy');
})


