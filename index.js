var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var fs = require('fs')



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.set('view engine', 'ejs')


app.get('/search', function(req, res) {
    res.render('writerhome')
})

app.post('/search', function(req, res) {

    if (req.body.title != "") {
        var createEvent = {
            "Title": req.body.title,
            "Info": req.body.info,
            "Time": req.body.time
        }
        saveJson(createEvent)
        res.render('writerhome')
    } else {
        res.render('writerhome')
    }

})

//saving to textfile. (json) 
function saveJson(createEvent) {
    fs.writeFile("test.txt", JSON.stringify(createEvent), function(err) {
        if (err) {
            return console.log(err);
        }
        return console.log("post was created")

    })

}

app.set('view engine', 'ejs')	
 

//Used for testing/example
var db = require("./database");
db.insert_search_into_database("Test", "20:32", "1920-12-02", "THE BESt EVER", function (err, result) {
  if (err) return err;
  return result;
})

db.read_everything_from_table(function (err, result) {
  if (err) return err;
  return result;
})


app.listen(3000)

