//mini application for Author API
const exp = require('express');
const authorApp = exp.Router();
const bcryptjs = require('bcryptjs');
authorApp.use(exp.json());
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken=require('../Middlewares/verfiyToken')

require('dotenv').config();
let authorscollection;
let articlescollection;
//get usercollection app
authorApp.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})
//Author registration
authorApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const dbuser = await authorscollection.findOne({ username: newUser.username });
    if (dbuser != null) {
        res.send({ message: "user exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        newUser.password = hashedPassword;
        await authorscollection.insertOne(newUser);
        res.send({ message: "User created" });
    }
}));
//Author Login
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    const dbUser = await authorscollection.findOne({ username: userCred.username });
    if (dbUser === null) {
        res.send({ message: "Invalid username" });
    } else {
        const status = await bcryptjs.compare(userCred.password, dbUser.password);
        if (status === false) {
            res.send({ message: "Invalid password" });
        } else {
            const signedToken = jwt.sign({ username: dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ message: "Login success", token: signedToken, user: dbUser });
        }
    }
}));
//Add new articles by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle=req.body;
    console.log(newArticle)
    //post to artciles collection
    await articlescollection.insertOne(newArticle)
    //send res
    res.send({message:"New article created"})
}))

//modify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
    //update by article id
   let result= await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlescollection.findOne({articleId:modifiedArticle.articleId})
    res.send({message:"Article modified",article:latestArticle})
}))
//Soft delete an article by article ID-Change status to false

//delete an article by article ID
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=(+req.params.articleId);
    //get article 
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
       let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
   
   
}))

//read articles of author
//read articles of author
authorApp.get('/articles/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    // Get author's username from URL
    const authorName = req.params.username;
    // Get articles whose status is true and username matches
    const articlesList = await articlescollection.find({ status: true, username: authorName }).toArray();
    res.send({ message: "List of articles", payload: articlesList });
}));


module.exports = authorApp;



