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
let currentIDUser = ""

app.post("/getUserLogin", function (req, res){
    const requestedUser = (req.body);
    console.log(requestedUser)
    UserModel.findOne({email: requestedUser.email, password: requestedUser.password }, function(err,results){
        if (err){
            console.log("Incorrect email or password")
        }else{
            res.json(results);
        }
    })
})

app.post("/getUserByID", function (req, res){
    const requestedUser = (req.body.userID);
    UserModel.findById(requestedUser, function(err,results){
        res.json(results);
    })
})

// app.post("/getSpecificTicket", function (req, res){
//     const requestedTicketID = req.body.ticketID;
//     UserModel.findById(req.body.userId, function(err,results){
//         res.json(results)
//     })
// })

app.post("/createNewUser", function(req, res){
    const reqUser = (req.body.newUserDoc)
    const newUser = new UserModel({
        fname: reqUser.fname,
        lname: reqUser.lname,
        email: reqUser.email,
        password: reqUser.password
    });
    // dont need to specify the projects, can be seen as re assigning to an already set variable/const.
    newUser.save();
    res.json("User created.")
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
            res.json(results);
        }
    });
    
})


app.post("/deleteBug", function(req,res){
    requestedBugID = req.body.bugID;
    requestedUserID = req.body.currentUserID;
    console.log(requestedBugID);
    console.log(requestedUserID);
    UserModel.findOneAndUpdate({ _id: requestedUserID }, { $pull: { projects: { _id: requestedBugID } }}, function(err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log("New bug successfully deleted.");
        }
    })
})





// app.get("/editBug",function(req,res){
//     UserModel.findById(currentIDUser, function(err,results){
//         results.projects.map(function(x){
//             if (x._id == specEditBug){
//                 res.render("index",{Name:x.projectName, Status:x.bugStatus, Description:x.bugText, Priority:x.bugPriority, ID:x._id})
//             }else {
//                 console.log("still searching.")
//             }
//         })
//     })

// })

app.post("/changeBug",function(req,res){
    console.log(req.body.editNewObject.nameTick);
    UserModel.findOneAndUpdate({_id: req.body.currentUser, 'projects._id': req.body.bugID}, { $set: { "projects.$.projectName": req.body.editNewObject.nameTick, "projects.$.bugStatus" :req.body.editNewObject.statTick, "projects.$.bugText":req.body.editNewObject.textTick , "projects.$.bugPriority": req.body.editNewObject.priorTick }}, function(err, results){
        console.log(results)
    })
});

app.listen(3001,function(){
    console.log("Server is running succesfully on port: 3001")
})