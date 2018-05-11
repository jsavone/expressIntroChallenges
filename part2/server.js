const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 8000;
var idCount = 0;

// ### Challenge 1:
// Create a POST route for "/create/:name/:age" that creates an object that looks like this:
// {
//   "name": "troy",
//   "age": 20
// }
// Then take that object and insert it into storage.json

// ### Challenge 4 (stretch):
// Modify your logic so every object has and id field that automatically goes up by one for every object inserted (first object has an id of 1, second object has an id of 2 ect). Then modify challenge 3 so that it finds the object by an id instead of by name.

app.post('/create/:name/:age', function(req, res) {
  if (fs.readFileSync('part2/storage.json', 'utf-8') == "") {
    var storageArr = [];
  }else{
    var storageArr = JSON.parse(fs.readFileSync('part2/storage.json', 'utf-8'))
  }
  idCount = storageArr.length+1;
  let personObj = {
    id: idCount,
    name: req.params.name,
    age: Number(req.params.age)
    }
  storageArr.push(personObj);
  let storageStr = JSON.stringify(storageArr)
  fs.writeFileSync("part2/storage.json", storageStr);
  res.send(storageArr)
});

// ### Challenge 2:
// Create a Get route for "/" that returns all of the objects inside storage.json.

app.get('/', function(req, res) {
  let nameList = JSON.parse(fs.readFileSync('part2/storage.json', 'utf-8'))
  res.json(nameList)
})

// ### Challenge 3:
// Create a Get route for "/:name" that returns the first object in storage.json that matches the name. If there is no object in storage.json that matches then return a 400 status.

// app.get('/:name', function(req, res) {
//   let nameObj = JSON.parse(fs.readFileSync('part2/storage.json', 'utf-8'))
//   nameObj.forEach(function(person) {
//     if (person.name == req.params.name) {
//       res.json(person)
//     };
//   });
//   res.sendStatus(400);
// });

//MODIFIED TO COMPLETE STRETCH

app.get('/:id', function(req, res) {
  let nameObj = JSON.parse(fs.readFileSync('part2/storage.json', 'utf-8'))
  nameObj.forEach(function(person) {
    if (person.id == req.params.id) {
      res.json(person)
      return
    };
  });
  res.sendStatus(400);
});

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
