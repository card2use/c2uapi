var mydb = require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferModelSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bank_name : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'BankLists',
        required: [true, 'Bank name is required']
    },
    card_type : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'CardTypes',
        required: [true, 'Card type is required']
    },
    card_network : {
        type: String,
        required: [true, 'Card type is required']
    },
    country : String,
    city : String,
    geo: {
        type: [Number],
        index: '2d'
    },
    locationpoint: {
        type: { type: String, default: "Point"},
        coordinates: [Number]
    },
    location: String,
    valid_from: {
        type : Date,
        default : Date.now
    },
    valid_till: {
        type : Date,
        default : Date.now
    },
    discount: Number,
    rewards_points: Number,
    cashback: Number,
    mall : String,
    description: String,
    coupancode: String,
    push_message: String,
    discount_type: String,
    added_on : {
        type : Date,
        default : Date.now
    },
    updated_on : {
        type : Date,
        default : Date.now
    }
})

OfferModelSchema.index({ locationpoint: "2dsphere" });

module.exports = mongoose.model('Offers', OfferModelSchema);