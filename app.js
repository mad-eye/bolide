var express = require('express');
var app = express();
var sharejs = require('share').server;

var options = {db: {type: 'redis'}};
sharejs.attach(app, options);

app.get('/', function(req, res){
  res.send('Hello World');
});
app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log('Listening on port 3000');