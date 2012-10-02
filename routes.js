(function () {

  var GitHubApi = require("github");
  var github = new GitHubApi({
    version: "3.0.0"
  });

  var sys = require('sys');
  var exec = require('child_process').exec;

  var routes = module.exports = function(app) {

    app.get('/', function(req, res){
      res.send('Hello World');
    });

    app.get('/github', function(req, res){
      var path = __dirname + "/views/github.jade";
      res.render(path, {});
    });

    app.post('/clone', function(req, res) {
      var resBody = "";
      var gitUrl;
      github.repos.get({
        user: "fgnass",
        repo: "node-dev"
      }, function(err, ghResponse) {
        if (err) {
          console.error(JSON.stringify(err));
          res.send("ERROR: " + JSON.stringify(err));              
        } else {
          gitUrl = ghResponse["git_url"];
          resBody += 'Cloning ' + gitUrl;
          var puts = function (error, stdout, stderr) {
            console.log("STDOUT: " + stdout);
            console.log("STDERR: " + stderr);
            if (error) {
              res.send("ERROR: " + error);              
            } else {
              res.send("Cloned " + gitUrl);              
            }
          };
          exec("ls -la", puts);
        }
      });
    });

  };

})();
