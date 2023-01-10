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
            console.log(results)
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
    const newProject = {projectName:projectObject.name, projectOwner:projectObject.owner, projectBugs:[] }
    console.log(newProject);

    

    UserModel.findOneAndUpdate(
        { _id: projectObject.userIDBase }, 
        { $push: { projects: newProject  } },
        function (error, results) {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
    });

    // Work on adding create bug ting ye

})

app.post("/createBug",function(req,res){
    const bugObject = (req.body);
    const projectID = bugObject.currentProjID._id
    const newTicket = {bugName:bugObject.Name, bugStatus:bugObject.Status, bugText:bugObject.Text, bugPriority:bugObject.Priority}

    // let projIndex = 0

    // UserModel.findById(bugObject.userIDBase, function(err,results){
    //     results.projects.map(function(x,index){
    //         // console.log(x._id)
    //         // console.log(index)
    //         if (x._id == projectID){
    //             projIndex = index;
    //             console.log(projIndex);
    //         }else{

    //         }
    //     });
    // })
    console.log(bugObject)
    console.log(projectID)
    console.log(bugObject.userIDBase)

    UserModel.updateOne(
        { "_id": bugObject.userIDBase, "projects._id": projectID}, 
        { "$push": { "projects.$.projectBugs" : {"bugName":bugObject.Name, "bugStatus":bugObject.Status, "bugText":bugObject.Text, "bugPriority":bugObject.Priority}  } },
        function(err,results){
            if (err){
                console.log(err)
            }else{
                res.json(results)
            }
        }
        
    );

    // UserModel.findOneAndUpdate(
    // { "_id": bugObject.userIDBase}, 
    // { "$push": { "projects.$[i].projectBugs" : newTicket  } },
    // { arrayFilters: [{'i._id': projIndex,},],}
    
    // );
    
})


app.post("/deleteBug", function(req,res){
    const requestedBugID = req.body.bugID;
    const requestedUserID = req.body.currentUserID;
    const requestedProjID = req.body.currentProjID;
    UserModel.updateOne(
        { "_id": requestedUserID, "projects._id": requestedProjID}, 
        { "$pull": { "projects.$.projectBugs" : { "_id":requestedBugID}  } },
        function(err,results){
            if (err){
                console.log(err)
            }else{
                res.json(results)
            }
        }
        
    );
})



app.post("/changeBug",function(req,res){
    const requestedBugID = req.body.bugID;
    const requestedUserID = req.body.currentUser;
    const requestedProjID = req.body.projectId;

    const editedObject = (req.body.editNewObject);
    
    UserModel.updateOne(
        {_id:requestedUserID,"projects._id":requestedProjID},
        {$set: { 'projects.$[s].projectBugs.$[n].bugName': editedObject.nameTick,'projects.$[s].projectBugs.$[n].bugText': editedObject.textTick ,'projects.$[s].projectBugs.$[n].bugStatus': editedObject.statTick , 'projects.$[s].projectBugs.$[n].bugPriority': editedObject.priorTick} },
        {arrayFilters: [{'s._id':requestedProjID} ,{'n._id':requestedBugID}],multi:true },
        (err,result) => {
            if (err) { console.log(err); }
            console.log(result)
   
    });
    

    // UserModel.findOneAndUpdate({_id: requestedUserID}, 
    //     { 
    //       "$set": {"projects.$[outer].projectBugs.$[inner].bugName": editedObject.nameTick} 
    //     },
    //     { 
    //       "arrayFilters": [{ "outer.id": requestedProjID },{ "inner.id": requestedBugID }]
    //     },
    //     function(err, response) {
    //       console.log(err);
    //       console.log(response);
    // })


});

app.listen(3001,function(){
    console.log("Server is running succesfully on port: 3001")
})