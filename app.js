const express=require("express") //For the Express run the application
const userRouter=require('./routes/user.routes') //For the User Routes
const dotEnv=require('dotenv') //For Env File
const dbConnect=require('./config/db') //For the connection DB
dotEnv.config()//this will help to use all field in env file in our project

dbConnect();
const app=express()

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))



//Trying  phele yeh URL /user/test
app.use('/user',userRouter)

app.listen(4000,()=>{
    console.log("Server is Ready")
})