const exp=require('express')
const app=exp();
 app.use(exp.json())
require('dotenv').config()
const mongoClient=require('mongodb').MongoClient;

const path=require('path')
app.use(exp.static(path.join(__dirname,'../client/client/build')))
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const blogdb=client.db('blogdb')
    let userscollection=blogdb.collection('userscollection')
    app.set('userscollection',userscollection)
    let articlescollection=blogdb.collection('articlescollection')
    app.set('articlescollection',articlescollection)
    let authorscollection=blogdb.collection('authorscollection')
    app.set('authorscollection',authorscollection)
    console.log("DB Connection success")
})
.catch(err=>console.log("Error in DB connection",err))

//import API Routes
const userApp=require('./APIs/user-api')
const adminApp=require('./APIs/admin-api')
const authorApp=require('./APIs/author-api')
//If path starts with userAPI send request to userAPI using path middlewares
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/author-api',authorApp)
//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/client/build/index.html'))
})
//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payLoad:err.message})
})
const port=process.env.PORT||5000;
app.listen(port,()=>console.log(`Web server on ${port}`))
