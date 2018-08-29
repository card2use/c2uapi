require('../activerecord');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	uniqueidentifier: { 
		type : Number,
		required: [true, 'Number can not be null']
	},
	added_on : { 
		type: Date, 
		default: Date.now 
	}
})

module.exports = mongoose.model('Counters', CounterSchema);