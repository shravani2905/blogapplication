//mini application for Admin  API
const exp=require('express')
const adminApp=exp.Router();

adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"This is from admin API"})

})
module.exports=adminApp;