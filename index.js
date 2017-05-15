var express = require('express')

var app = express()
 
app.get('/search', function (req, res) {
  res.render('writerhome')
})

app.post('/search', function (req, res) {

  res.send('hej')
})
app.set('view engine', 'ejs')	
 
app.listen(3000)