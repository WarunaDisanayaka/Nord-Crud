const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    empName:{
        type : String,
        required : [true,'Please enter Project Name'],
    },
    empContact:{
        type : String,
        required : [true,'Please enter password'],
    },
    empGender:{
        type : Number,
        required : [true,'Please enter password'],
    },
    empPosition:{
        type : Date,
        required : [true, 'Please enter date'],
    },
    endDate:{
        type : Date,
        required : [true, 'Please enter date'],
    },
});



module.exports = mongoose.model("Employee", empSchema);