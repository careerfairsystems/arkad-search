var express = require('express')

var app = express()
 
app.get('/search', function (req, res) {
  res.render('writerhome')
})

app.post('/search', function (req, res) {

  res.send('hej')
})
app.set('view engine', 'ejs')	
 


var db = require("./database");
db.insert_search_into_database("Test", "20:32", "1920-12-02", "THE BESt EVER", function (err, result) {
  console.log("GOT INSERT ERROR", err);
  console.log(result);
})

db.read_everything_from_table(function (err, result) {
  console.log("GOT GOD RESULT",err);
  console.log(result);
})


app.listen(3000)