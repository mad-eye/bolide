var express = require('express');
var app = express();
var sharejs = require('share').server;

var options = {db: {type: 'redis'}, browserChannel:{cors: "*"}};
sharejs.attach(app, options);

app.get("/", function(req,res){
  res.send("all is well");
});


app.listen(3003);
console.log('Listening on port 3003');
