var express = require('express');
var app = express();
var sharejs = require('share').server;

var options = {db: {type: 'redis'}};
sharejs.attach(app, options);

//Put routing in routs.js
require('./routes')(app);

//app.get('/', function(req, res){
//  res.send('Hello World');
//});

//app.get('/github', function(req, res){
//  //res.send('Hello Github!' + __dirname);
//  var path = __dirname + "/views/github.jade";
//  console.log("Rendering " + path);
//  res.render(path, {});
//});

app.use(express.static(__dirname + '/public'));

app.listen(3003);
console.log('Listening on port 3003');
