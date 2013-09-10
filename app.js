var express = require('express');
var app = express();
var sharejs = require('share').server;
var Settings = require('madeye-common').Settings;
var cors = require("./cors");
var LogListener = require('madeye-common').LogListener;

listener = new LogListener({logLevel: 'debug'})

app.use(cors());

//TODO be more restrictive about domains
var options = {db: {type: 'redis'}, browserChannel:{cors: "*"}};
sharejs.attach(app, options);

app.get("/", function(req,res){
  res.send("all is well");
});

app.listen(Settings.bolidePort);
listener.log('info', "Listening on port " + Settings.bolidePort);
