const mongoose=require('mongoose')

function  connectDb(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Mongo is Ready.")
    })
}

module.exports=connectDb