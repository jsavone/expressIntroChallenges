var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.get('/hello', function(req, res) {
  res.send("Hello!");
});

app.post('/create/:name', function(req, res) {
  let nameObj = {"id":1,"name":""+req.params.name+""}
  res.json(nameObj)
});

app.get('/verify/:age', function(req, res) {
  let age = Number(req.params.age);
    if (age > 13) {
      res.sendStatus(200)
    }
      res.sendStatus(403)
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
