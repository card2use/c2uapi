require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardTypeModelSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	bank_name: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BankLists',
        required: [true,"Bank name is required"]
    },
    card_type : {
        type : String,
        required: [true,"Card type is required"]
    },
	status: { 
		type : String,
		default: 'Active'
	},
	added_on : { 
		type: Date, 
		default: Date.now 
	},
	updated_on : { 
		type: Date, 
		default: Date.now 
	}
})

module.exports = mongoose.model('CardTypes', CardTypeModelSchema);