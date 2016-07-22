var express = require('express');
var cookieSession = require('cookie-session');
var request = require('request');
var qs = require('querystring');
var app = express();
var GitHub = require('github-api');


if (app.get('env') !== 'production'){
  require('dotenv').config();
}

var port = process.env.PORT || 3000;

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: [
    '86637a8a5169c6b2fd76b01676b039207eb5e1e0',
    '36093fb4e8d0d4019667d519754f358eeec30b79'
  ]
}))

app.get('/oauth_callback', function(req,res){
  var code = req.query.code, state = req.query.state;
  console.log('req.query', req.query)

  var url = 'https://github.com/login/oauth/access_token?'+qs.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
    code: req.query.code,
    state: state
  })

  request({
    method: 'post',
    url: url,
    headers: {
      'User-Agent': 'Node'
    },
  }, function(error, response, body){
    if (error) throw error;
    var params = qs.parse(response.body)
    req.session.github_access_token = params.access_token;
    res.redirect("/")
  })
})

app.get('/logout', function(req,res){
  delete req.session.github_access_token
  res.redirect('/')
})

app.get('/api/profile', function(req, res){
  if (!req.session.github_access_token){
    res.json({
      error: "not logged in",
      notLoggedIn: true,
      loginURI: getLoginURI(),
    })
    return;
  }
  var gh = new GitHub({token: req.session.github_access_token});

  var me = gh.getUser()

  me.getProfile().then(function(response){
    var issue = response.data;
    res.json(issue)
  }).catch(function(error){
    res.json({
      error: error
    })
  })
})


app.get('/api/goals', function(req, res){
  if (!req.session.github_access_token) throw new Error('ACCESS DENIED')

  var gh = new GitHub({token: req.session.github_access_token});
  var issues = gh.getIssues('GuildCrafts', 'web-development-js')

  issues.listIssues().then(function(response){
    var issues = response.data;
    res.json(issues)
  }).catch(function(error){
    res.json({
      error: error
    })
  })
});

app.get('/api/goals/:goalNumber', function(req, res){
  var goalNumber = req.params.goalNumber

  var gh = new GitHub({token: req.session.github_access_token});
  var issues = gh.getIssues('GuildCrafts', 'web-development-js')

  issues.getIssue(goalNumber).then(function(response){
    var profile = response.data;
    res.json(profile)
  }).catch(function(error){
    res.json({
      error: error
    })
  })
});


app.use(express.static(__dirname+'/public'));

app.get('*', function (req, res) {
  res.sendFile(__dirname+'/public/index.html')
});


app.listen(port, function () {
  console.log('Example app listening on port http://0.0.0.0:'+port);
});



function getLoginURI(){
  var loginURI = 'https://github.com/login/oauth/authorize'
  loginURI += '?'+qs.stringify({
    scope: 'user read:org admin:org repo',
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
    state: 'FROGS_SUCK'
  })
  return loginURI
}
