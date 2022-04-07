const express = require("express")
const mongoose = require("mongoose")


const app = express()
app.use(express.json())
const cors = require("cors")

app.use(cors());

mongoose.connect("mongodb+srv://dbEstateUser:gorfantE2012@cluster0.vsu98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

app.get("/",function(req,res){
    res.send("Hello! this is working")
})


app.listen(3001,function(){
    console.log("Server is running succesfully on port: 3001")
})