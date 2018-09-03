var Offer = require('../model/reviewmodel');
var common = require('../common');
var mongoose = require('mongoose');

module.exports = {
    addReview : function(req, res){
        var ReviewObj = new CardModel({ 
            _id : mongoose.Types.ObjectId(),
            userid: req.body.userid, 
            comments: req.body.comments, 
            stargiven: req.body.stargiven
        });

        ReviewObj.save().then( Response=>{
            return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response});
        }).catch( error=>{
            return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
        })
    },

    getReview : function(req, res){
        Offer.find().select('-__v').populate('userid').exec().then( response=>{
            return res.status(200).json({'status':200,'message':'success','dataList':response});
        }).catch( error=>{
            return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
        })
    }
    
}