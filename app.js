var express = require('express');
var app = express();
var sharejs = require('share').server;
var cors = require("./cors");
var Logger = require('pince');

console.log(process.env);

log = new Logger('app');

//Clear out prefix used by nginx in case it slips by, like on test
app.use('/ot', function(req, res, next) {
  newUrl = req.originalUrl.substr(3);
  res.redirect(newUrl);
});
app.use(cors());

//TODO be more restrictive about domains
var redisHost = process.env.REDIS_PORT_6379_TCP_ADDR;
var redisPort = process.env.REDIS_PORT_6379_TCP_PORT;
console.log("REDIS HOST", redisHost);
console.log("REDIS PORT", redisPort);
var options = {db: {type: 'redis', hostname: redisHost, port: redisPort}, browserChannel:{cors: "*"}};
sharejs.attach(app, options);

app.get("/", function(req,res){
  res.send("all is well");
});

var port = 3003;
app.listen(port);
log.info("Listening on port " + port);
