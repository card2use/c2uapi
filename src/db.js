// for mongo db
var MongoClient = require('mongodb').MongoClient

var state = {
    db: null,
}

exports.connect = function (done) {
    if (state.db) return done()

    MongoClient.connect('mongodb://rootUser:SOh3TbYhx8ypJPxmt1oOfLKU@18.213.100.94:27017/c2u_database', function (err, db) {
        if (err) return done(err)
       // dbo = db.db("c2u_database"); 
        state.db = db;      
        done();
    })
}

exports.get = function () {
    return state.db;
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

