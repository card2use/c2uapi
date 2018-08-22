#!/usr/bin/env node
var express= require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var constaint = require('./src/constraint');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(express.static('public'));
require('./src/routing')(app);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

http.createServer(app).listen(4200);