var mydb = require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactModelSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    email : {
        type : String,
        required : [true, "Email field must be given"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    comments : String,
    phonenumber : Number,
    added_on : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Contactrequest', ContactModelSchema);