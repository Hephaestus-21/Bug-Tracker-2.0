const express = require("express")
const mongoose = require("mongoose")
const BugModel = require("./models/Bugs")
let ejs = require('ejs');

require("dotenv").config()

const app = express()
app.use(express.json())
const cors = require("cors");
const UserModel = require("./models/Users");
app.use(express.urlencoded( {extended: true} ));
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

app.use(cors());

mongoose.connect(process.env.MONGOOSEURL)


let specEditBug = ""

app.post("/getUser", function (req, res){
    const requestedUser = (req.body);
    UserModel.findOne({email: requestedUser.email }, function(err,results){
        console.log(results.projects);
        res.json(results);
    })
})

app.post("/createBug",function(req,res){
    const bugObject = (req.body);
    const newBug = new BugModel({projectName:bugObject.Name, bugStatus:bugObject.Status, bugText:bugObject.Text, bugPriority:bugObject.Priority});
    console.log(newBug);
    newBug.save();
})

app.post("/deleteBug", function(req,res){
    const specId = (req.body.bugId);
    BugModel.deleteOne({_id: specId },function(err,result){
        res.json(result.projects)
    })
})



app.post("/editBugID",function(req,res){
    specEditBug = (req.body.bugEdit)
})

app.get("/editBug",function(req,res){
    BugModel.find({_id:specEditBug},function(err,docs){
        const [projName,bugStat,bugDesc,bugPrior,bugId] = [docs[0].projectName, docs[0].bugStatus, docs[0].bugText, docs[0].bugPriority,docs[0]._id ]
        res.render("index",{Name:projName, Status:bugStat, Description:bugDesc,Priority:bugPrior,ID:bugId});
    });

})

app.post("/changeBug",function(req,res){
    console.log("yay");
    console.log(req.body)
    const editId = (req.body.buttonEJS);
    BugModel.findByIdAndUpdate( editId, {projectName: req.body.bugNameEJS, bugStatus: req.body.bugStatEJS, bugText: req.body.bugDescEJS, bugPriority: req.body.bugPriorEJS,}, function(err,docs){
        if (err){
            console.log(err);
        }else{
            console.log("Updated User: ", docs);
            res.redirect("http://localhost:3000");
        }
    })
    // BugModel.findByIdAndUpdate
})

app.listen(3001,function(){
    console.log("Server is running succesfully on port: 3001")
})