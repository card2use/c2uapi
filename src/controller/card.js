var mongoose = require('mongoose');
var common = require('../common');

const CardModel = require("../model/cardmodel");
const BankModel = require("../model/bankmodel");
const CardTypeModel = require("../model/cardtypemodel");

module.exports = {
	saveCard: function(req,res){
		common.myLogger(req,res);

		var CardObj = new CardModel({ 
			_id : mongoose.Types.ObjectId(),
			type: req.body.type, 
			bank_name: req.body.bank_name, 
			card_network: req.body.card_network, 
			card_color: req.body.card_color, 
			added_by:req.body.added_by,
			country:req.body.country,
			city : req.body.city,
			geo : [ req.body.lat, req.body.lng ]
		});

		CardObj.save().then( response=>{
			return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response});
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		});
	},

	getCards: function(req,res){
		//common.myLogger(req,res);
		var query = {};
		if( typeof req.params.customerid != 'undefined' && req.params.customerid !=''){
			query = { added_by: req.params.customerid };
		}
		CardModel.find(query).select('-__v').populate('bank_name','bank_name').populate('type','card_type').exec().then( response=>{
			return res.status(200).json({'status':200,'message':'success','dataList':response});
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
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

		if(typeof req.body.card_color != 'undefined'){
			tempData['card_color'] =  req.body.card_color;
		}

		tempData['updated_on'] = new Date();
		cardObj = { $set: tempData };

		CardModel.findByIdAndUpdate(req.body.id,cardObj,{ new: true }).then( response=>{
			return res.status(200).json({'status':200,'message':'Updated Successfully','dataList':response });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		});
	},

	deleteCard : function(req,res){
		common.myLogger(req,res);

		CardModel.findByIdAndRemove(req.params.id).exec().then( response=>{
			return res.status(200).json({'status':200,'message':'Deleted Successfully','dataList':response });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		});
	},

	addBank : function(req,res){
		common.myLogger(req,res);

		if (req.fileValidationError) {
			return res.status(500).json({'status':500,'message':'Something went wrong','error':req.fileValidationError });
		}
		if(typeof req.file == 'undefined'){
			req.file={};
			req.file['filename']='';
		}
		var BankData = new BankModel({
			_id : mongoose.Types.ObjectId(),
			bank_name: req.body.bank_name,
			bank_image: req.file.filename,
			country : req.body.country,
			city : req.body.city,
			status:'Active'
		});

		BankData.save().then( response=>{
			return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
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
		bankObj['updated_on'] = new Date();

		BankModel.findByIdAndUpdate(req.params.id,bankObj,{ new: true }).exec().then( response=>{
			return res.status(200).json({'status':200,'message':'Updated Successfully','dataList':bankObj });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
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

		BankModel.find(query).select('-__v').exec().then( response=>{
			return res.status(200).json({'status':200,'message':'success','dataList':response});
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
	},

	deleteBank : function(req,res){
		common.myLogger(req,res);

		BankModel.findByIdAndRemove(req.params.id).exec().then( response=>{
			return res.status(200).json({'status':200,'message':'Deleted Successfully','dataList':response });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
	},

	postCardTypes: function(req,res){
		common.myLogger(req,res);

		var CardTypeData = new CardTypeModel({
			_id : mongoose.Types.ObjectId(),
			bank_name: req.body.bank_name,
			card_type: req.body.card_type,
			status:'Active',
		});

		CardTypeData.save().then( response=>{
			return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
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
		cardTypeObj['updated_on'] = new Date();
		
		CardTypeModel.findByIdAndUpdate(req.params.id,cardTypeObj).exec().then( response=>{
			return res.status(200).json({'status':200,'message':'Updated Successfully','dataList':response });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
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

		CardTypeModel.find(query).select('-__v').exec().then( response=>{
			return res.status(200).json({'status':200,'message':'success','dataList':response});
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
	},
	postCardBenifits: function(req,res){
		common.myLogger(req,res);
	}
}