var mongoose = require('mongoose');
var common = require('../common');
const UserModel = require("../model/usermodel");
const CounterModel = require("../model/countermodel");

module.exports = {
	postUser: function(req,res){
		common.myLogger(req,res);

		CounterModel.findOne().sort({ '_id': -1 }).limit(1).exec().then( response=>{
			if(response && Object.keys(response).length > 1 ){
				CounterModel.findByIdAndUpdate({ _id:response._id },
					{
					 $inc : { uniqueidentifier: 1 },
					 $set: { added_on: new Date() }
					}).exec()
					.then( response=>{
						var UserData = new UserModel({ 
							_id : mongoose.Types.ObjectId(),
							name: req.body.name, 
							email:req.body.email,
							phone: req.body.phone,
							sex:req.body.sex,
							age:req.body.age,
							userid: parseInt(response.uniqueidentifier),
							access_deviceid : req.body.access_deviceid, 
							country : req.body.country,
							city : req.body.city,
							geo : [ req.body.lat, req.body.lng ]
						});
						UserData.save().then( response=>{
							return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response });
						}).catch( error=>{
							return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
						})
					}).catch( error=>{
						return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
					})
			}else{
				var GenerateKey = new CounterModel({
					_id : mongoose.Types.ObjectId(),
					uniqueidentifier : 12345,
					added_on : new Date()
				});
				GenerateKey.save().then(response=>{
					var UserData = new UserModel({ 
						_id : mongoose.Types.ObjectId(),
						name: req.body.name, 
						email:req.body.email,
						phone: req.body.phone,
						sex:req.body.sex,
						age:req.body.age,
						userid: parseInt(response.uniqueidentifier),
						access_deviceid : req.body.access_deviceid, 
						country : req.body.country,
						city : req.body.city,
						accessip : req.body.accessip,
						geo : [ req.body.lat, req.body.lng ]
					});
					UserData.save().then( response=>{
						return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response });
					}).catch( error=>{
						return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
					})
				}).catch( error=>{
					return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
				})
			}
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error,"last":"last" });
		})
	},

	updateUser : function(req,res){
		common.myLogger(req,res);
	
		var tempData = {};
		if(typeof req.body.name != 'undefined'){
			tempData['name'] =  req.body.name;
		}
		if(typeof req.body.email != 'undefined'){
			tempData['email'] =  req.body.email;
		}
		if(typeof req.body.phone != 'undefined'){
			tempData['phone'] =  req.body.phone;
		}
		if(typeof req.body.sex != 'undefined'){
			tempData['sex'] =  req.body.sex;
		}
		if(typeof req.body.age != 'undefined'){
			tempData['age'] =  req.body.age;
		}
		tempData['updated_on'] = new Date();
		//tempData = { $set: tempData };

		UserModel.findByIdAndUpdate(req.params.id,tempData,{ new: true }).exec().then( response=>{
			if(response){
				return res.json({'status':200,'message':'Updated Successfully','dataList':response});
			}else{
				return res.status(404).json({'status':404,'message':'No user found','dataList':{}});
			}
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
	},

	doLogin : function(req,res){
		common.myLogger(req,res);

		UserModel.findOne({'userid':req.body.customerid}).select('-__v').exec().then( response=>{
			return res.status(200).json({'status':200,'message':'success','dataList':response});
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
	}
}