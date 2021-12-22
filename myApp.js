var express = require('express');
const req = require('express/lib/request');
require('dotenv').config();
const bodyParser = require('body-parser');
var app = express();

console.log("Hello World");

const absolutePath = __dirname + '/views/index.html';
const absolutePublicPath = __dirname + '/public';

//app.use('/public',express.static(absolutePublicPath));
//bodyParser.urlencoded({extended: false});

app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res,next) {
    console.log(req.method +' '+req.path+' - ::'+req.ip);
    next();
});

app.use('/public',express.static(absolutePublicPath));

app.get('/',function(req, res) {
    res.sendFile(absolutePath);
});

app.get('/json', function (req,res) {
    console.log("log ",process.env.MESSAGE_STYLE);
    if (process.env.MESSAGE_STYLE === 'uppercase')
        res.json({"message": "HELLO JSON"});
    else
        res.json({"message": "Hello json"});
});

app.get('/now',function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.send({time: req.time});
});

app.get('/:word/echo', function(req,res){
    res.send({echo: req.params.word})
});

app.get('/name', function(req,res){
    res.send({name: req.query.first+' '+req.query.last})
});

app.post('/name', function(req,res){
    res.send({name: req.body.first+' '+req.body.last})
});

module.exports = app;
