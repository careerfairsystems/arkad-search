var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var fs = require('fs')
var db = require("./database");
var Fuse = require('fuse.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'ejs')

app.get('/search', function(req, res) {
    res.render('writerhome')
})

app.post('/search', function(req, res) {

    if (req.body.title != "") {
        var createEvent = {
            "Name": req.body.name,
            "Time": req.body.time,
            "Date": req.body.date,
            "Info": req.body.info
        }
        db.insert_search_into_database(createEvent.Name,createEvent.Time,createEvent.Date,createEvent.Info, function(err, result){
            if(err) return err;
            return result;
        })

        res.render('writerhome')
    } else {
        res.render('writerhome')
    }

})

app.get('/database',function(req,res){
  db.read_everything_from_table(function (err, result) {
  })
});




app.get('/test',function(req,res){
  db.read_everything_from_table(function (err, result) {
    if (err) return err;
    var options = {
      shouldSort: true,
      threshold: 0.5,
      minMatchCharLength: 0,
      keys: [{
        name: 'name',
        weight: 0.75
      }, {
        name: 'time',
        weight: 0.5
      }, {
        name: 'date',
        weight: 0.3
      }, {
        name: 'info',
        weight: 0.3
      }]
    };
    var fuse = new Fuse(result, options);
    res.json(fuse.search('k3win'));
  })
});


//Used for testing/example

db.insert_search_into_database("Test", "20:32", "1920-12-02", "THE BESt EVER", function (err, result) {
  if (err) return err;
  return result;
})

db.read_everything_from_table(function (err, result) {
  if (err) return err;
  return result;
})


app.listen(3001)
