var mydb = require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewModelSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UsersLists',
        required : [ true, 'Please provide userid ']
    },
    comments : String,
    stargiven : Number,
    added_on : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Review', ReviewModelSchema);