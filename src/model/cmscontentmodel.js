var mydb = require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CmsContentModelSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contenttext : {
        type : String,
        required : [true, "Text Must be given"]
    },
    contentfor : {
        type : String,
        required : [true, "Specify for which section you want to save the text"],
        unique: true
    },
    added_on : {
        type : Date,
        default : Date.now
    }
})
CmsContentModelSchema.index({contentfor:1}, {unique: true});
module.exports = mongoose.model('CmsContents', CmsContentModelSchema);