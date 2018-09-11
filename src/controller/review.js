var Review = require('../model/reviewmodel');
var common = require('../common');
var mongoose = require('mongoose');

module.exports = {
    addReview : function(req, res){
        common.myLogger(req,res);
        var ReviewObj = new Review({ 
            _id : mongoose.Types.ObjectId(),
            userid: req.body.userid, 
            comments: req.body.comments, 
            stargiven: req.body.stargiven,
            userinterface : req.body.userinterface,
            easeofuse : req.body.easeofuse,
            rewardsaccuracy : req.body.rewardsaccuracy,
            locationaccuracy : req.body.locationaccuracy,
            usefulness : req.body.usefulness
        });

        ReviewObj.save().then( response=>{
            return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response});
        }).catch( error=>{
            return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
        })
    },

    getReview : function(req, res){
        common.myLogger(req,res);
        Review.find().select('-__v').populate('userid','name').exec().then( response=>{
            return res.status(200).json({'status':200,'message':'success','dataList':response});
        }).catch( error=>{
            return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
        })
    }
    
}