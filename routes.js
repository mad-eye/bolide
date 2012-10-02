(function () {

var GitHubApi = require("github");
var github = new GitHubApi({
    version: "3.0.0"
});

var routes = module.exports = function(app) {

    app.get('/', function(req, res){
        res.send('Hello World');
    });

    app.get('/github', function(req, res){
        github.repos.get({
            user: "fgnass",
            repo: "node-dev"
        }, function(err, res) {
            if (err) {
                console.error(JSON.stringify(err));
            } else {
                var gitUrl = res["git_url"];
                console.log(gitUrl);
            }
        });
        var path = __dirname + "/views/github.jade";
        res.render(path, {});
    });

};

})();
