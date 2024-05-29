//mini application for Admin  API
const exp=require('express')
const commonApp=exp.Router();

commonApp.get('/common',(req,res)=>{
    res.send({message:"Response from common app"})
})
module.exports=commonApp;