//require
const AppWrite=require('node-appwrite')
const serviceAcc=require('../api-key.json')

const appwrite=AppWrite.initializeApp({
     credential:AppWrite.credential.cert(serviceAcc),
     storageBucket:"myDrive"
})

module.exports=appwrite