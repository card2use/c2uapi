//var mydb = require('../db').get;
var mydb = require('../activerecord');
var constaint = require('../constraint');
var ObjectID = require('mongodb').ObjectID; 
var common = require('../common');

module.exports = {
	postUser: function(req,res){
		common.myLogger(req,res);

		if(typeof req.body.name=='undefined' || typeof req.body.email=='undefined' || typeof req.body.phone=='undefined' || typeof req.body.sex=='undefined' || typeof req.body.age=='undefined' || typeof req.body.access_deviceid=='undefined'){
			return res.status(400).json({'status':400,'message':'Please provide all the required field'});
		}
		var datetime = new Date();
		var recordSet = mydb.collection("uniqueUserKey").find().sort({uniquekey:-1}).limit(1).toArray(function(err,response){
    		if (err) throw err;
    		var newKey = response[0].uniquekey+parseInt(1);
    		var uniqueKeyObj = { uniquekey: newKey, added_on: new Date() };
    		mydb.collection("uniqueUserKey").insertOne(uniqueKeyObj, function(err, response) {
				if (err) throw err;
				var userObj = { name: req.body.name, email:req.body.email,phone: req.body.phone,sex:req.body.sex,age:req.body.age,customerid: parseInt(newKey), access_deviceid : req.body.access_deviceid, added_on: new Date() }
				mydb.collection("usersList").insertOne(userObj, function(err, response) {
					if (err) throw err;
					console.log("1 document inserted in userList");
					return res.json({'status':200,'message':'Added Successfully','dataList':userObj });
				 });
			 });

    	})
	},

	updateUser : function(req,res){
		if(typeof req.params.key=='undefined' || req.params.key != global.key ){
			return res.status(401).json({'status':401,'message':'Unauthorized'});
		}
		if(req.params.id==''){
			return res.status(400).json({'status':400,'message':'Please provide all the required field'});
		}
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
		tempData['last_modified'] = new Date();
		tempData = { $set: tempData };
		console.log(tempData);
		var condition = { '_id': ObjectID(req.params.id) };
		mydb.collection("usersList").updateOne(condition, tempData, function(err, response) {
			if (err) throw err;
			console.log("1 document updated in userlist ");
			return res.json({'status':200,'message':'Updated Successfully','dataList':tempData});
		});
	},

	doLogin : function(req,res){
		common.myLogger(req,res);
		
		if(typeof req.body.customerid=='undefined' || req.body.customerid==''){
			return res.json({'status':400,'message':'Please provide all the required field'});
		}

		var query = { customerid: parseInt(req.body.customerid) };
		console.log(query);
		mydb.collection("usersList").find(query).toArray(function(err, response) {
			if (err) throw err;
			console.log("select users for login");
			if(response.length > 0){
				return res.json({'status':200,'message':'success',dataList:response});
			}else{
				return res.json({'status':200,'message':'error',dataList:{}});
			}
		});
	}
}