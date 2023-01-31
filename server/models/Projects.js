const mongoose = require("mongoose");

var Schema = mongoose.Schema

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    projectOwner: {
        type: String,
        required: true,
    },
    addedUsers: [String],
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
    }]
})

const ProjectModel = mongoose.model("projects",ProjectSchema);

module.exports = ProjectModel;