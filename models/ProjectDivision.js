const mongoose = require('mongoose');

const projectdivisionSchema = new mongoose.Schema({
    divisionName:{
        type : String,
        required : [true,'Please enter Division Name'],
    },
    project:{
        type : String,
        required : [true,'Please enter project name'],
    },
});



module.exports = mongoose.model("ProjectDivision", projectdivisionSchema);