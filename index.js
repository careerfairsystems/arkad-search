var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var fs = require('fs')
var db = require("./database");
var Fuse = require('fuse.js');
var fuseOptions = require('./fuse-option.json');






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
})


app.get('/arkad-search/:searchTerm',function(req,res){
  
  db.read_everything_from_table(function (err, result) {
    if (err) return err;
    var fuse = new Fuse(result, fuseOptions);
    res.json(fuse.search(req.params.searchTerm));
  })
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
