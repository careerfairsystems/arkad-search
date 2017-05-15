var express = require('express');
var database = require('./database')
var app = express();

database.read_everything_from_table(function (err, result) {
})

app.get('/search', function (req, res) {
  res.send('Search stuff here')
});

app.post('/search', function (req, res) {
  res.send('Create search stuff here')
});
 
app.listen(3000);