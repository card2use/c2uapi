require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankModelSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	bank_name: { 
		type : String,
		required: [true, 'Please provide Bank Name']
	},
	bank_image: String,
	country: String,
	city: String,
	status: { 
		type : String,
		default: 'Active'
	},
	added_on : { 
		type: Date, 
		default: Date.now 
	}
})

module.exports = mongoose.model('BankLists', BankModelSchema);