var common = require('./common');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        callback(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
});

var upload = multer({ 
    storage: storage, 
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            req.fileValidationError = 'File type is not supported, only image file is allowed.';
            return cb(null, false, req.fileValidationError);
        }else{
			cb(null, true);
		}
        
    },
    onError : function(err, next) {
        console.log('error', err);
        next(err);
    }
}).single('productImage');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.json({
            status: 'SUCCESS'
        })
    });

    var card = require("./controller/card");
    var user = require("./controller/user");
    var offer = require("./controller/offers");
    var review = require("./controller/review");
    var common = require("./controller/commonuse")
    app

    //    .get("/getMyCards/:key/:id",card.myCard)
       .post("/postMyCard/:key",card.saveCard)
       .get("/getMyCards/:key/:customerid",card.getCards)
       .get("/getAllCards/:key",card.getCards)
       .put("/putCard/:key",card.updateCard)
       .delete("/deleteCard/:key/:id",card.deleteCard)
       .post("/postBank/:key",upload,card.addBank)
       .put("/putBank/:key/:id",card.updateBank)
       .post("/getAllBanks/:key",card.getBanks)
       .delete("/deleteBank/:key/:id",card.deleteBank)
       .post("/postCardType/:key",card.postCardTypes)
       .put("/putCardTypes/:key/:id",card.putCardTypes)
       .post("/getCardTypes/:key",card.getCardTypes)
       .post("/postUser/:key",user.postUser)
       .post("/postLogindetails/:key",user.doLogin)
       .put("/putUser/:key/:id",user.updateUser)
       .post("/offer/:key",offer.addoffer)
       .post("/getoffer/:key",offer.getoffer)
       .post("/review/:key",review.addReview)
       .get("/review/getReview/:key",review.getReview)
       .post("/common/:key",common.postContactReq)
       .get("/common/:key",common.getContactReqList)
       .post("/common/cmscontentpost/:key",common.cmscontentpost)
       .post("/common/cmscontentget/:key",common.cmscontentget)
       .get('*', function(req, res){
		   res.status(404).send("Sorry can't find that!")
		});

};