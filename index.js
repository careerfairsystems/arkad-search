var express = require('express')
var bodyparser = require('body-parser')
var app = express()
 
app.use(bodyparser.json())

app.get('/search', function (req, res) {
  res.render('writerhome')
})

app.post('/search', function (req, res) {

  res.send(console.log('Title ' + req.body))
})
app.set('view engine', 'ejs')	
 
app.listen(3000)