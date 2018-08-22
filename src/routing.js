module.exports = function(app) {
    app.get('/', function(req, res) {
        res.json({
            status: 'SUCCESS'
        })
    });

    var card = require("./controller/card");
    var user = require("./controller/user");
    app
    //    .get("/getMyCards/:key/:id",card.myCard)
       .post("/postMyCard/:key",card.saveCard)
       .get("/getMyCards/:key/:customerid",card.getCards)
       .get("/getAllCards/:key",card.getCards)
       .put("/putCard/:key",card.updateCard)
       .delete("/deleteCard/:key/:id",card.deleteCard)
       .post("/postBank/:key",card.addBank)
       .put("/putBank/:key/:id",card.updateBank)
       .post("/getAllBanks/:key",card.getBanks)
       .delete("/deleteBank/:key/:id",card.deleteBank)
       .post("/postCardType/:key",card.postCardTypes)
       .put("/putCardTypes/:key/:id",card.putCardTypes)
       .post("/getCardTypes/:key",card.getCardTypes)
       .post("/postUser/:key",user.postUser)
       .post("/postLogindetails/:key",user.doLogin)
       .put("/putUser/:key/:id",user.updateUser)
       .get('*', function(req, res){
		   res.status(404).send("Sorry can't find that!")
		});

};