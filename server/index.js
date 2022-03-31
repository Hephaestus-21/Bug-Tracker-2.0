const express = require("express")
const mongoose = require("mongoose")


const app = express()
app.use(express.json())
const cors = require("cors")

app.get("/",function(req,res){
    res.send("Hello! this is working")
})



app.listen(3001,function(){
    console.log("Server is running succesfully on port: 3001")
})