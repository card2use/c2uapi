var mydb = require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardModelSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
    type: { 
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'CardTypes',
		required: [true, 'Please provide type']
	},
	bank_name: { 
        type: mongoose.Schema.Types.ObjectId, 
		ref: 'BankLists',
		required: [true, 'Please provide bank details']
    },
	card_network: { 
		type : String,
		required: [true, 'Please provide Card Network']
	},
	country : String,
    city : String,
    geo: {
        type: [Number],
        index: '2d'
    },
	card_color : String,
	added_by : { 
        type: mongoose.Schema.Types.ObjectId, 
		ref: 'UsersLists',
		required: [true, 'Please provide added by']
    },
	added_on : { 
		type: Date, 
		default: Date.now 
	},
	updated_on : { 
		type: Date, 
		default: Date.now 
	}
});

module.exports = mongoose.model('MyCards', CardModelSchema);

