require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var UserModelSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid : {
        type : Number,
        required : [ true , "userid can not be null"],
        unique : [true , "User id must be unique "],
    },
    name : {
        type : String,
        required : [true, "Name field must be given"]
    },
    email : {
        type : String,
        required : [true, "Email field must be given"],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone : {
        type : Number,
        required : [true, "Phone field must be given"]
    },
    sex : String,
    age: String,
    accessip: String,
    country : String,
    city : String,
    geo: {
        type: [Number],
        index: '2d'
    },
    added_on : {
        type : Date,
        default : Date.now
    },
    updated_on : {
        type : Date,
        default : Date.now
    }
})
module.exports = mongoose.model('UsersLists', UserModelSchema);