const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName:{
        type : String,
        required : [true,'Please enter Project Name'],
    },
    projectLocation:{
        type : String,
        required : [true,'Please enter password'],
    },
    cost:{
        type : Number,
        required : [true,'Please enter password'],
    },
    startDate:{
        type : Date,
        required : [true, 'Please enter date'],
    },
    endDate:{
        type : Date,
        required : [true, 'Please enter date'],
    },
});



module.exports = mongoose.model("Project", projectSchema);