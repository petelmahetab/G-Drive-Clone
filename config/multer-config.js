const multer=require('multer')
const appwriteStorage=require('multer-appwrite-storage')
const AppWrite=require('node-appwrite')
const service=require('../api-key.json')

const storage=appwriteStorage({
    credentials:AppWrite.credentials.cert(service),
    bucketName:"myDrive",
    unique:true,
})


const upload=multer({
    storage:storage,
})

module.exports=upload