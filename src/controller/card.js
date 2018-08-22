//var mydb = require('../db').get;
var mydb = require('../activerecord');
var formidable = require('formidable');
var ObjectId = require('mongodb').ObjectID;
var common = require('../common');
var multer = require('multer');

module.exports = {
	saveCard: function(req,res){
		common.myLogger(req,res);
		if(typeof req.body.type=='undefined' || typeof req.body.bank_name=='undefined' || typeof req.body.card_network=='undefined' || typeof req.body.customerid=='undefined'){
			return res.json({'status':400,'message':'Please provide all the required field'});
		}
		
		var datetime = new Date();
		var cardObj = { type: req.body.type, bank_name: req.body.bank_name, card_network: req.body.card_network, card_color: req.body.card_color, added_by:req.body.customerid, added_on: datetime };
		mydb.collection("myCards").insertOne(cardObj, function(err, response) {
			if (err) throw err;
			console.log("1 document inserted");
			return res.json({'status':200,'message':'Added Successfully','dataList':cardObj});
		  });
	},

	getCards: function(req,res){
		common.myLogger(req,res);
		var query = {};
		if( typeof req.params.customerid != 'undefined' && req.params.customerid !=''){
			query = { added_by: req.params.customerid };
		}
		mydb.collection("myCards").find(query).toArray(function(err, response) {
			if (err) throw err;
			console.log("select users card list");
			return res.json({'status':200,'message':'success','dataList':response});
		});
	},

	updateCard: function(req,res){
		common.myLogger(req,res);
		
		var tempData = {};
		if(typeof req.body.bank_name != 'undefined'){
			tempData['bank_name'] =  req.body.bank_name;
		}
		if(typeof req.body.type != 'undefined'){
			tempData['type'] =  req.body.type;
		}
		if(typeof req.body.card_network != 'undefined'){
			tempData['card_network'] =  req.body.card_network;
		}

		if(Object.keys(tempData).length > 0 && typeof req.body.id != 'undefined' && req.body.id!=''){
			tempData['updated_on'] = new Date();
			cardObj = { $set: tempData };
		}else{
			return res.status(400).json({'status':400,'message':'Please provide all the required field'});
		}
		
		var myquery = { '_id': ObjectId(req.body.id) };
		
		mydb.collection("myCards").updateOne(myquery, cardObj, function(err, response) {
			if (err) throw err;
			console.log("1 document update");
			return res.json({'status':200,'message':'Updated Successfully','dataList':cardObj });
		});
	},

	deleteCard : function(req,res){
		common.myLogger(req,res);

		var myquery = { '_id': ObjectId(req.params.id) };
		mydb.collection("myCards").deleteOne(myquery, function(err, response) {
			if (err) throw err;
			console.log("1 document deleted");
			return res.json({'status':200,'message':'Deleted Successfully','dataList':response });
		});
	},

	addBank : function(req,res){
		common.myLogger(req,res);
		
		if(typeof req.body.bank_name=='undefined' || req.body.bank_name==''){
			return res.status(400).json({'status':400,'message':'Please provide all the required field'});
		}

		var bankObj = { bank_name: req.body.bank_name,status:'Active', added_on: new Date() };
		mydb.collection("bankLists").insertOne(bankObj, function(err, response) {
			if (err) throw err;
			console.log("1 bank name document inserted");
			return res.json({'status':200,'message':'Added Successfully','dataList':bankObj });
		});
	},

	updateBank : function(req,res){
		common.myLogger(req,res);
		var bankObj = {};
		if(typeof req.body.bank_name!='undefined' && req.body.bank_name!=''){
			bankObj['bank_name'] = req.body.bank_name;
		}

		if(typeof req.body.status!='undefined' && req.body.status!=''){
			bankObj['status'] = req.body.status;
		}
		if(Object.keys(bankObj).length > 0 ){
			bankObj['updated_on'] = new Date();
			bankObj = { $set: bankObj };
		}else{
			return res.status(400).json({'status':400,'message':'Please provide all the required field'});
		}
		var myquery = { '_id': ObjectId(req.params.id) };
		mydb.collection("bankLists").updateOne(myquery, bankObj, function(err, response) {
			if (err) throw err;
			console.log("1 bank update");
			return res.json({'status':200,'message':'Updated Successfully','dataList':bankObj });
		});
	},

	getBanks : function(req,res){
		common.myLogger(req,res);

		var query = {};
		if( typeof req.body.status != 'undefined' && req.body.status !=''){
			query['status'] = req.body.status;
		}
		if( typeof req.body.bank_name != 'undefined' && req.body.bank_name !=''){
			query['bank_name'] = new RegExp(req.body.bank_name, "i");
		}
		mydb.collection("bankLists").find(query).toArray(function(err, response) {
			if (err) throw err;
			console.log("select bank list");
			return res.json({'status':200,'message':'success','dataList':response});
		});
	},

	deleteBank : function(req,res){
		common.myLogger(req,res);

		var myquery = { '_id': ObjectId(req.params.id) };
		mydb.collection("bankLists").deleteOne(myquery, function(err, response) {
			if (err) throw err;
			console.log("1 document deleted");
			return res.json({'status':200,'message':'Deleted Successfully','dataList':response });
		});
	},

	postCardTypes: function(req,res){
		common.myLogger(req,res);

		if(typeof req.body.bank_name=='undefined' || req.body.bank_name=='' || typeof req.body.card_type=='undefined' || req.body.card_type==''){
			return res.json({'status':400,'message':'Please provide all the required field'});
		}

		var cardTypeObj = { bank_name: req.body.bank_name,card_type: req.body.card_type,status:'Active', added_on: new Date() };
		mydb.collection("bankCardTypes").insertOne(cardTypeObj, function(err, response) {
			if (err) throw err;
			console.log("1 bank card types document inserted");
			return res.json({'status':200,'message':'Added Successfully','dataList':cardTypeObj });
		});
	},

	putCardTypes: function(req,res){
		common.myLogger(req,res);

		var cardTypeObj = {};

		if(typeof req.body.bank_name!='undefined' && req.body.bank_name!=''){
			cardTypeObj['bank_name'] = req.body.bank_name
		}
		if(typeof req.body.card_type!='undefined' && req.body.card_type!=''){
			cardTypeObj['card_type'] = req.body.card_type
		}
		if(typeof req.body.status!='undefined' && req.body.status!=''){
			cardTypeObj['status'] = req.body.status
		}
		if(Object.keys(cardTypeObj).length > 0 ){
			cardTypeObj['updated_on'] = new Date();
			cardTypeObj = { $set: cardTypeObj };
		}else{
			return res.json({'status':400,'message':'Please provide all the required field'});
		}
		var myquery = { '_id': ObjectId(req.params.id) };
		mydb.collection("bankCardTypes").updateOne(myquery , cardTypeObj, function(err, response) {
			if (err) throw err;
			console.log("1 card types document updates");
			return res.json({'status':200,'message':'Updated Successfully','dataList':cardTypeObj });
		});
	},
	getCardTypes: function(req,res){
		common.myLogger(req,res);

		var query = {};
		if( typeof req.body.bank_name != 'undefined' && req.body.bank_name !=''){
			query['bank_name'] = new RegExp(req.body.bank_name, "i");
		}
		if( typeof req.body.card_type != 'undefined' && req.body.card_type !=''){
			query['card_type'] = new RegExp(req.body.card_type, "i");
		}
		if( typeof req.body.status != 'undefined' && req.body.status !=''){
			query['status'] = new RegExp(req.body.status, "i");
		}
		mydb.collection("bankCardTypes").find(query).toArray(function(err, response) {
			if (err) throw err;
			console.log("select bankCardTypes list");
			return res.json({'status':200,'message':'success','dataList':response});
		});
	},
}