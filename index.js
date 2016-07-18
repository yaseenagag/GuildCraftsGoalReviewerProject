if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello People!');
});

app.get('/oauth_keys_check', function (req, res) {
  res.send(
    'GITHUB_CLIENT_ID: '+process.env.GITHUB_CLIENT_ID+"\n"+
    'GITHUB_CLIENT_SECRET: '+process.env.GITHUB_CLIENT_SECRET+"\n"
  );
});

app.listen(port, function () {
  console.log('Example app listening on port http://0.0.0.0:'+port);
});
