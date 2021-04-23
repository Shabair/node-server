import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv'

/**
 * Import Routers
 */
import postRouter from './routers/posts.js'
import aboutRouter from './routers/about.js'
import authRouter from './routers/auth.js'

const app = express();

app.use(express.json());
dotenv.config();

/**
 * DB Connection and after successful connection start Server
 */

mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true , 
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false

})
.then(()=>{
    console.log("Connection Succeefull.....");
    const port = process.env.PORT;
    app.listen(port,()=>{
        console.log(`Server is running at port http://localhost:${port}`)
    });
})
.catch((error)=>{
    console.log("Connection failed...!")
    console.log(error.message);
});




/**
 * All Routers
 */

//post Router
app.use('/posts',postRouter);

//sign-in Router
app.use('/',authRouter);

//single about
app.use('/about',aboutRouter);


//single Home
app.get('/',(req, res)=>{
    res.send('In The Home Page');
});


//single page contact
app.get('/contact',(req, res)=>{
    res.send('In The Contact Page');
});