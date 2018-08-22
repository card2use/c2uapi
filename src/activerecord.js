//var Db = require('mysql-activerecord');
var mongoose = require('mongoose');

var db;
var state = {
    db: null,
}
function connectDatabase() {
    if (!db) {
        //console.log('here');
        mongoose.connect('mongodb://rootUser:SOh3TbYhx8ypJPxmt1oOfLKU@18.213.100.94:27017/c2u_database', { useNewUrlParser: true });
        db = mongoose.connection;
        state.db = db;  
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    return db;
}
exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}
module.exports = connectDatabase();