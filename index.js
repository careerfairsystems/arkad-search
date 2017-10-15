var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var fs = require('fs')
var db = require("./database");
var Fuse = require('fuse.js');
var fuseOptions = require('./fuse-option.json');
var session = require('express-session');
var bcrypt = require('bcrypt');

const saltRounds = 10;

app.use(express.static(__dirname + '/views'));

// Set up an Express session,
app.use( session({
    secret            : 'super secret key',
    resave            : false,
    saveUninitialized : true
}));


// Login middleware for /contet
var login = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

// Render login form if not loggedin, else redirect to content
app.get('/login', (req, res) => {
    if (!req.session.isLoggedIn) {
        res.render('login');
    } else {
        res.redirect('/content');
    }
})

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.post('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) return res.render('error')
        res.redirect('/login');
    })
})

app.get('/create_account', (reg,res) => {
    res.render('create_admin');
})

app.post('/create_account', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Hashing and salting password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.render('error')
        db.add_user(username, hash, (err, result) => {
            if (err) return res.render('error');
            res.redirect('/login');
        })
    });
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.get_user(username, (err, result) => {
        if (err) return res.render('error');
        if (result.rows.length != 0) {
            const hash = result.rows[0].password;
            bcrypt.compare(password, hash, (err, match) => {
                if (err) return res.render('error');
                if (match) {
                    req.session.regenerate((err) => {
                        req.session.isLoggedIn = true;
                        res.redirect('/content');
                    });
                } else {
                    res.redirect('/login');
                }
            })
        } else {
            res.redirect('/login');
        }
    })
})

app.get('/search', login, function(req, res) {
    res.render('writerhome')
})

app.post('/search', login, function(req, res) {

    if (req.body.title != "") {
        var createEvent = {
            "Name": req.body.name,
            "Time": req.body.time,
            "Date": req.body.date,
            "Info": req.body.info
        }
        db.insert_search_into_database(createEvent.Name,createEvent.Time,createEvent.Date,createEvent.Info, function(err, result){
            if(err) return res.render('error');
            return res.render('writerhome')
        })
    } else {
        res.render('writerhome')
    }
})

app.get('/content', login,function(req,res){
    db.read_everything_from_table(function (err, result) {
        var dbcontent = result;
        res.render('database_content',{
            dbcontent: dbcontent
        });
    })
})

app.get('/edit/:id', login, function(req, res) {
    db.read_entry(req.params.id, function(err, result) {
        if (err) return res.render('error');
        return res.render('edit_post', {
            entry: result.rows[0]
        });
    });
})

app.post('/edit/:id', login, function(req, res) {
    db.update_entry({
        id: req.params.id,
        name: req.body.name,
        time: req.body.time,
        date: req.body.date,
        info: req.body.info
     }, function(err, result) {
        if (err) return res.render('error');
        return res.redirect('/content');
    });
})

app.post('/delete/:id', login, function(req, res) {
    db.delete_search(req.params.id, function(err, result) {
        if (err) return res.render('error');
        return res.redirect('/content');
    });
})


app.get('/arkad-search/:searchTerm', function(req,res){
    db.read_everything_from_table(function (err, result) {
        if(err) return res.render('error');
        var fuse = new Fuse(result, fuseOptions);
        res.json(fuse.search(req.params.searchTerm));
    })
});

app.get('/users', login,function(req,res){
    db.read_users_from_table(function (err, result) {
        var dbusers = result;
        res.render('database_users',{
            dbusers: dbusers
        });
    })
})

app.post('/admin_permission', login, function(req, res){
 console.log("hej");
 console.log(req.query.username);
 console.log(req.query.value);
  db.update_admin_permission(
    {
      username: req.query.username,
      admin: req.query.admin
    }, function(err, result) {
        if (err) return res.render('error');
        return res.redirect('/users');
    });
})


// This needs to be last!
app.use((req, res) => {
    res.render('404');
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
