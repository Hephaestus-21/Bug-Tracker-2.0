require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const BugModel = require("./models/Bugs");
let ejs = require('ejs');



const app = express()
app.use(express.json())
const cors = require("cors");
const UserModel = require("./models/Users");
const ProjectModel = require("./models/Projects")
app.use(express.urlencoded( {extended: true} ));
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

app.use(cors());

// mongoose.connect(process.env.MONGOOSEURL)
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOOSEURL, () => {
  console.log("Connected to MongoDB");
});

app.post("/getUserLogin", function (req, res){
    const requestedUser = (req.body);
    console.log(requestedUser)
    UserModel.findOne({email: requestedUser.email, password: requestedUser.password }, function(err,results){
        if (err){
            console.log(err)
        }else{
            res.send(results);
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

app.post("/createProject",function(req,res){
    const projectObject = (req.body);

    const newProject = new ProjectModel({
        projectName:projectObject.name,
        projectOwner:projectObject.owner,
        addedUsers: [projectObject.owner]
    });
    newProject.save();
    res.json("User created.")


})

app.post("/getUserProjects", function(req,res){
    const email = (req.body.userEmail)
    console.log(email)
    ProjectModel.find({addedUsers: email },function(err, results){
        res.json(results)
        console.log(results)
    })
    console.log("yay")
})

app.post("/getSingleProject",function(req,res){
    const projectID = (req.body.projectID)
    ProjectModel.findById(projectID,function(err, results){
        res.json(results)
        console.log(results)
    })
})

app.post("/createBug",function(req,res){
    const bugObject = (req.body);
    const projectID = bugObject.currentProjID._id
    const newTicket = {"bugName":bugObject.Name, "bugStatus":bugObject.Status, "bugText":bugObject.Text, "bugPriority":bugObject.Priority}

    ProjectModel.findOneAndUpdate({"_id": projectID},
        {"$push": {"projectBugs": newTicket}},
        function(err,results){
            if (err){
                console.log(err)
            }else{
                res.json(results)
            }
    })
    
});


app.post("/deleteBug", function(req,res){
    const requestedBugID = req.body.bugID;
    const requestedProjID = req.body.projectID;

    ProjectModel.updateOne({_id:requestedProjID}, 
        {"$pull":{ "projectBugs":{"_id":requestedBugID}}},
        function(err,results){
            if (err){
                console.log(err)
            }else{
                res.json(results)
            }
        })

})



app.post("/changeBug",function(req,res){
    const bugID = req.body.bugID;

    const editedBug = (req.body.editNewObject);

    ProjectModel.updateOne({"projectBugs._id" : bugID},{"$set" : {
        "projectBugs.$.bugName": editedBug.nameTick,
        "projectBugs.$.bugStatus": editedBug.statTick,
        "projectBugs.$.bugText": editedBug.textTick,
        "projectBugs.$.bugPriority": editedBug.priorTick
     }},function(err,results){
        if (err){
            console.log(err);
        }else{
            res.json(results);
        }
     })
       


});

app.listen(3001,function(){
    console.log("Server is running succesfully on port: 3001")
})