const express = require("express")
const mongoose = require("mongoose")
const UserModel = require("./models/Users")
const key = require("./mongKey")


const app = express()
app.use(express.json())
const cors = require("cors")

app.use(cors());

mongoose.connect(key.default)

app.get("/",function(req,res){
    res.send("Hello! this is working")
})

app.get("/getUsers" , function(req, res){
    UserModel.find({}, function(err , result){
        if (err) {
            console.log(err)
        }else{
            res.json(result)
        }
    })
})

app.post("/createUser", async function(req,res){
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user)

})

app.listen(3001,function(){
    console.log("Server is running succesfully on port: 3001")
})