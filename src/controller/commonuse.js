var mongoose = require('mongoose');
var common = require('../common');
var ContactUsModel = require("../model/contactmodel");
var CmsContents = require("../model/cmscontentmodel");

module.exports = {
    postContactReq : function(req, res){
        common.myLogger(req,res);
        var contactreqobj = new ContactUsModel({
            _id : mongoose.Types.ObjectId(),
            name : req.body.name,
            email : req.body.email,
            comments : req.body.comments,
            phonenumber : req.body.phonenumber
        });

        contactreqobj.save().then( response=>{
            return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response });
        }).catch( error=>{
            return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
        })
    },
    cmscontentpost: function(req,res){
        common.myLogger(req,res);
        CmsContents.find({contentfor:req.body.contentfor}).sort({'_id':-1}).limit(1).exec( function(query,response){
            if(response.length <= 0 ){
                var contactustextobj = new CmsContents({
                    _id : mongoose.Types.ObjectId(),
                    contenttext : req.body.contenttext,
                    contentfor : req.body.contentfor
                })
                contactustextobj.save().then( response=>{
                    return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response });
                }).catch( error=>{
                    return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
                })
            }else{
                CmsContents.findByIdAndUpdate(response[0].id,{ contenttext : req.body.contenttext}).exec().then( response=>{
                    return res.status(200).json({'status':200,'message':'updated Successfully','dataList':response });
                }).catch( error=>{
                    return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
                })
            }
        })
    },
    cmscontentget: function(req,res){
        common.myLogger(req,res);
        CmsContents.find({contentfor:req.body.contentfor}).select('contenttext , contentfor').sort({'_id':-1}).limit(1).exec().then( response=>{
            return res.status(200).json({'status':200,'message':'success','dataList':response});
        }).catch( error=>{
            return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
        })
    },
    getContactReqList : function(req, res){
        common.myLogger(req,res);
        ContactUsModel.find().exec().then( response=>{
            return res.status(200).json({'status':200,'message':'success','dataList':response});
        }).catch( error=>{
            return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
        })
    }
}