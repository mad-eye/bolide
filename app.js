var express = require('express');
var app = express();
var sharejs = require('share').server;
var Settings = require('madeye-common').Settings;
var cors = require("./cors");
var LogListener = require('madeye-common').LogListener;

listener = new LogListener({logLevel: 'debug'})

//Clear out prefix used by nginx in case it slips by, like on test
app.use('/ot', function(req, res, next) {
  newUrl = req.originalUrl.substr(3);
  res.redirect(newUrl);
});
app.use(cors());

//TODO be more restrictive about domains
var options = {db: {type: 'redis'}, browserChannel:{cors: "*"}};
sharejs.attach(app, options);

app.get("/", function(req,res){
  res.send("all is well");
});

app.listen(Settings.bolidePort);
listener.log('info', "Listening on port " + Settings.bolidePort);
