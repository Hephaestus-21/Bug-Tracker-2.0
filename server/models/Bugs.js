const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
    projectName: {
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
})

const BugModel = mongoose.model("bug",BugSchema);

module.exports = BugModel;