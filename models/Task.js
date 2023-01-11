const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName:{
        type : String,
        required : [true,'Please enter Project Name'],
    },
    taskType:{
        type : String,
        required : [true,'Please enter Project Name'],
    },
    
});



module.exports = mongoose.model("Task", taskSchema);