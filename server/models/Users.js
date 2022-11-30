const mongoose = require("mongoose");

var Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [{
        projectName: {
            type: String,
            required: true,
        },
        projectOwner: {
            type: String,
            required: true,
        },
        projectBugs: [{
            bugName: {
                type: String,
                required: true,
            },
            bugStatus:{
                type: String,
                required: true,
            },
            bugText: {
                type: String,
                required: true,
            },
            bugPriority: {
                type: String,
                required: true,
            }
        }],
    }]
})

const UserModel = mongoose.model("users",UserSchema);

module.exports = UserModel;

