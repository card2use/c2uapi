var Offer = require('../model/offermodel');
const CardModel = require("../model/cardmodel");
var common = require('../common');
var mongoose = require('mongoose');
//mongoose.set('debug', true);
var crdLists=[];
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
		var query = {},newArray=[],promises=[];
		if(req.body.userid){
			promises.push(
				new Promise(function(resolve, reject) {
					CardModel.find({ added_by:req.body.userid }).select('type , card_network').exec(function(query,result){
						var promiseInside=[];
						for(i=0;i<=result.length;i++){
							if(result[i]){
								newArray.push((result[i].type).toString());
								promiseInside.push(result[i]);
							}
						}
						Promise.all(promiseInside).then( succFn=>{
							resolve({'cardList':newArray});
						})
					})
				})
			);
		}
		
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
			promises.push({'locationpoint':req.body.lng+'-'+req.body.lat});
		}
		
		if( typeof req.body.bank_name !='undefined' ){
			query['bank_name'] = req.body.bank_name;
			promises.push({'bank_name':req.body.bank_name});
		}
		
		Promise.all(promises).then(dataAll=>{
			if( req.body.card_type && newArray.length<=0){
				query['card_type'] = req.body.card_type;
			}
			if(newArray.length > 0){
				query['card_type'] = {
					'$in':newArray
				};
			}
						
			Offer.find(query).exec(function(query,response){
				
				return res.status(200).json({'status':200,'message':'success','dataList':response});
			})
		}).catch( error=>{
			return res.status(500).json({'status':500,'message':'error','error':error });
		})
				
	}

}