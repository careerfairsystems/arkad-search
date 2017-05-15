var express = require('express')
var app = express()
 
app.get('/search', function (req, res) {
  res.send('Search stuff here')
})

app.post('/search', function (req, res) {
  res.send('Create search stuff here')
})
 
app.listen(3000)