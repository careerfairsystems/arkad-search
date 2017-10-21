var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var fs = require('fs')
var db = require("./database");
var Fuse = require('fuse.js');
var fuseOptions = require('./fuse-option.json');
var session = require('express-session');
var bcrypt = require('bcrypt');
var Raven = require('raven');

/**
 * Allows us to setup CORS
 */
var cors = require('cors')

// Setting up Error Handling
Raven.config(process.env.SENTRY_DSN).install();
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());
// Optional fallthrough error handler
function throwError(err, res) {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    Raven.captureException(err);
    return res.render('error');
}

const saltRounds = (process.env.NODE_ENV === 'production') ? 10 : 4;

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
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.post('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) return throwError(err, res);
        res.redirect('/login');
    });
});

app.get('/create_account', login, (reg,res) => {
    res.render('create_user');
});

app.post('/create_account', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Hashing and salting password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return throwError(err, res);
        db.add_user(username, hash, (err, result) => {
            if (err) return throwError(err, res);
            res.redirect('/login');
        });
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.get_user(username, (err, result) => {
        if (err) return throwError(err, res);
        if (result.rows.length != 0) {
            const hash = result.rows[0].password;
            bcrypt.compare(password, hash, (err, match) => {
                if (err) return throwError(err, res);
                if (match) {
                    req.session.regenerate((err) => {
                        req.session.isLoggedIn = true;
                        req.session.isAdmin = result.rows[0].admin;
                        res.redirect('/content');
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/search', login, function(req, res) {
    res.render('post_add')
});

app.post('/search', login, function(req, res) {

    if (req.body.title != "") {
        var createEvent = {
            "Name": req.body.name,
            "Time": req.body.time,
            "Date": req.body.date,
            "Info": req.body.info
        }
        db.insert_search_into_database(createEvent.Name,createEvent.Time,createEvent.Date,createEvent.Info, function(err, result){
            if(err) return throwError(err, res);
            return res.render('post_add')
        });
    } else {
        res.render('post_add')
    }
});

app.get('/content', login,function(req,res){
    db.read_everything_from_table(function (err, result) {
        if (err) return throwError(err, res);

        var dbcontent = result;
        res.render('content',{
            dbcontent: dbcontent
        });
    });
});

app.get('/edit/:id', login, function(req, res) {
    db.read_entry(req.params.id, function(err, result) {
        if (err) return throwError(err, res);
        return res.render('post_edit', {
            entry: result.rows[0]
        });
    });
});

app.post('/edit/:id', login, function(req, res) {
    db.update_entry({
        id: req.params.id,
        name: req.body.name,
        time: req.body.time,
        date: req.body.date,
        info: req.body.info
     }, function(err, result) {
        if (err) return throwError(err, res);
        return res.redirect('/content');
    });
});

app.post('/delete/:id', login, function(req, res) {
    db.delete_search(req.body.searchId, function(err, result) {
        if (err) return throwError(err, res);
        return res.json({redirect: '/content'});
    });
});


app.get('/arkad-search/:searchTerm', cors(), function(req,res){
    db.read_everything_from_table(function (err, result) {
        if (err) return throwError(err, res);
        var fuse = new Fuse(result, fuseOptions);
        db.insert_search_query(req.params.searchTerm, function(err, result) {
            if (err) return throwError(err, res);
        });
        res.json(fuse.search(req.params.searchTerm));
    })
});

app.get('/users', login,function(req,res){
    db.read_users_from_table(function (err, result) {
        if (err) return throwError(err, res);
        var dbusers = result;
        dbusers.sort(function(a, b) {
            return a.username > b.username;
        })
        res.render('users',{
            dbusers: dbusers,
            isAdmin: req.session.isAdmin
        });
    });
});

app.post('/admin_permission', login, function(req, res){
  db.update_admin_permission(
    {
      username: req.query.username,
      admin: req.query.admin
    }, function(err, result) {
        if (err) return throwError(err, res);
        return res.redirect('/users');
    });
});

app.post('/delete_user', login, function(req, res){
  db.delete_user({
      username: req.body.username
  }, function(err, result){
      if (err) return throwError(err, res);
      return res.json({redirect: '/users'});
  });
});

// This needs to be last!
app.use((req, res) => {
    res.render('404');
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});