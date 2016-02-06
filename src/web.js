var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('data'));
app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/*', function (req, res, next){
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

app.get('/', function (req, res){
  var path = __dirname+'/index.html';
  res.sendFile(path);
});

app.get('/OGW.json', function (req, res) {
  var ogwCardData;
  fs.readFile(__dirname+'.../data/OGW.json', function (err, ogwCardData) {
    if (err) throw err;
    console.log(ogwCardData);
    console.log(JSON.parse(ogwCardData));
  });
  res.send(ogwCardData);
});

app.get('/BFZ.json', function (req, res) {
  var bfzCardData;
  fs.readFile(__dirname+'.../data/BFZ.json', function (err, ogwCardData) {
    if (err) throw err;
    console.log(bfzCardData);
    console.log(JSON.parse(bfzCardData));
  });
  res.send(bfzCardData);
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  console.log(__dirname);
});
