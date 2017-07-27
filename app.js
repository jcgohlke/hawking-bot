const express = require('express');
const util = require('util')
const exec = require('child_process').exec;
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

var app = express();

// Configure mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configure public folder to statically serve resources
app.use(express.static('public'));

function logger(req,res,next) {
  console.log(new Date(), req.method, req.url);
  next();
}

function hello(req,res,next) {
  exec("say -v Fred " + req.body.deepthought);
  next();
}

app.get('/hello', logger, function (req, res) {
  res.render('hello');
});

app.get('/', function(req, res) {
  res.redirect('/hello');
});

app.post('/hello', logger, hello, function (req, res) {
  res.redirect('/hello');
});

app.listen(3000, function() {
  console.log('Hawking bot initialized');
});