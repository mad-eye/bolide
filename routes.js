(function () {

  var GitHubApi = require("github");
  var github = new GitHubApi({
    version: "3.0.0"
  });

  var sys = require('sys');
  var exec = require('child_process').exec;
  var uuid = require('node-uuid');

  var rootDir = "/tmp/bolide/repoClones/";

  function handleError(error, res) {
    console.error("ERROR: " + JSON.stringify(error));
    res.send("There was error: " + JSON.stringify(error));
  }


  function handleGitubUrlResponse(err, ghResponse, res) {
    if (err) {
      handleError(err, res);
    } else {
      exec('mkdir -p "' + rootDir + '"', function (error, stdout, stderr) {
        if (error) {
          handleError(error, res);
        } else {
          console.log(stdout);
          var repoDir = rootDir + uuid.v4();
          exec('git clone ' + ghResponse["git_url"] + ' "' + repoDir + '"', 
            function (error, stdout, stderr) {
              if (error) {
                handleError(error, res);
              } else {
                console.log(stdout);
                res.send("Cloned " + ghResponse["git_url"]);
              }
          });
        }
      });
    }
  }

  var routes = module.exports = function(app) {

    app.get('/', function(req, res){
      res.send('Hello World');
    });

    app.get('/github', function(req, res){
      var path = __dirname + "/views/github.jade";
      res.render(path, {});
    });

    app.post('/clone', function(req, res) {
      github.repos.get({
        user: "fgnass",
        repo: "node-dev"
      }, function(err, ghResponse) {
        handleGitubUrlResponse(err, ghResponse, res);
      });
    });

  };

})();
