const express = require("express")
const mongoose = require("mongoose")
const BugModel = require("./models/Bugs");
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
        res.json(results);
    })
})

app.post("/getUserTickets", function (req, res){
    const requestedUser = (req.body.userID);
    UserModel.findById(requestedUser, function(err,results){
        res.json(results);
    })
})


app.post("/createBug",function(req,res){
    const bugObject = (req.body);
    const newTicket = {projectName:bugObject.Name, bugStatus:bugObject.Status, bugText:bugObject.Text, bugPriority:bugObject.Priority}

    UserModel.findOneAndUpdate(
    { _id: bugObject.userIDBase }, 
    { $push: { projects: newTicket  } },
    function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log("New bug successfully added.");
        }
    });
    
})

app.post("/deleteBug", function(req,res){
    requestedBugID = req.body;
    UserModel.findOneAndUpdate({ _id: requestedBugID.userID }, { $pull: { projects: { _id: requestedBugID.bugId } }}, function(err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log("New bug successfully deleted.");
        }
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