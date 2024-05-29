//mini application for User API
const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');
userApp.use(exp.json());
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken=require('../Middlewares/verfiyToken')

let userscollection;
let articlescollection;
userApp.use((req, res, next) => {
    userscollection = req.app.get('userscollection');
    articlescollection = req.app.get('articlescollection');
    next();
});
//User registration
userApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const dbuser = await userscollection.findOne({ username: newUser.username });
    if (dbuser != null) {
        res.send({ message: "user exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        newUser.password = hashedPassword;
        await userscollection.insertOne(newUser);
        res.send({ message: "User created" });
    }
}));
//User Login
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    const dbUser = await userscollection.findOne({ username: userCred.username });
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

//get articles of all authors
userApp.get("/articles",verifyToken,expressAsyncHandler(async (req, res) => {
      //get articlescollection from express app
      const articlescollection = req.app.get("articlescollection");
      //get all articles
      let articlesList = await articlescollection
        .find({ status: true })
        .toArray();
      //send res
      res.send({ message: "articles", payload: articlesList });
    })
  );
//post comments for an arcicle by atricle id
userApp.post("/comment/:articleId",verifyToken,expressAsyncHandler(async (req, res) => {
    //get user comment obj
    const userComment = req.body;
    const articleIdFromUrl=(+req.params.articleId);
    //insert userComment object to comments array of article by id
    let result = await articlescollection.updateOne(
      { articleId: articleIdFromUrl},
      { $addToSet: { comments: userComment } }
    );
    console.log(result);
    res.send({ message: "Comment posted" });
  })
);
module.exports = userApp;
