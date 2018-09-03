var Offer = require('../model/offermodel');
var common = require('../common');
var mongoose = require('mongoose');
//mongoose.set('debug', true);
module.exports = {
	addoffer: function(req,res){
		common.myLogger(req,res);

		var Offerdata = new Offer({
			_id: new mongoose.Types.ObjectId,
			bank_name: req.body.bank_name,
			card_type: req.body.card_type,
			card_network: req.body.card_network,
			country: req.body.country,
			city: req.body.city,
			geo : [ req.body.lng,req.body.lat ],
			locationpoint: {
				type: "Point",
				coordinates: [req.body.lng,req.body.lat]
			},
			location: req.body.location,
			valid_from: req.body.valid_from,
			valid_till: req.body.valid_till,
			discount: req.body.discount,
			discount_type: req.body.discount_type,
			rewards_points: req.body.rewards_points,
			cashback: req.body.cashback,
			mall: req.body.mall,
			description: req.body.description,
			coupancode: req.body.coupancode,
			push_message: req.body.push_message
		});

		Offerdata.save().then( response=>{
			return res.status(200).json({'status':200,'message':'Added Successfully','dataList':response });
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'Something went wrong','error':error });
		})
	},

	getoffer: function(req, res){
		common.myLogger(req,res);
		var query = {};
		if( typeof req.body.lng != 'undefined' &&  typeof req.body.lat != 'undefined' && req.body.lng!='' && req.body.lat!=''){
			query['locationpoint'] = { 
				'$near':{ 
					'$maxDistance': 10000,
					'$geometry':{
						'type': "Point",
     					'coordinates': [req.body.lng, req.body.lat]
					}
				}
			};
		}
		if( req.body.bank_name ){
			query['bank_name'] = new RegExp(req.body.bank_name, "i");
		}
		if( req.body.card_type ){
			query['card_type'] = new RegExp(req.body.card_type, "i");
		}

		query['valid_from'] = { $lte: new Date() };
		query['valid_till'] = { $gte: new Date() };

		Offer.find(query).exec().then( response=>{
			return res.status(200).json({'status':200,'message':'success','dataList':response});
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'error','error':error });
		})
	}

}