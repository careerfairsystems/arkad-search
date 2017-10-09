var pg = require('pg')
var config = require('./config');

var database = {

    insert_search_into_database: function (name, time, date, info, callback) {
        const host = config.production.database.host;
        const database = config.production.database.database;
        const user = config.production.database.user;
        const pw = config.production.database.password;
        const connectionString = 'postgres://'+user+':'+pw+'@'+host+':5432/'+ database;
        var client = new pg.Client(connectionString);
        client.connect(function (err) {
            if (err) return callback(err, null);

            // execute a query on our database
            console.log('RUNNING query');
            client.query('INSERT INTO data(name, time, date, info) VALUES($1, $2, $3, $4)',
                [name, time, date, info]
                , function (err, result) {
                if (err) return callback(err, null);
                return callback(null, result)
            })
        })
    },
    get_user: function(username, callback) {
        const host = config.production.database.host;
        const database = config.production.database.database;
        const user = config.production.database.user;
        const pw = config.production.database.password;
        const connectionString = 'postgres://'+user+':'+pw+'@'+host+':5432/'+ database;
        var client = new pg.Client(connectionString);
        client.connect(function (err) {
            if (err) return callback(err, null);

            // execute a query on our database
            console.log('RUNNING query');
            client.query('SELECT * FROM users where username = $1 ',
                [username]
                , function (err, result) {
                if (err) return callback(err, null);
                return callback(null, result)
            })
        })
    },

    add_user: function(username, password, callback) {
        const host = config.production.database.host;
        const database = config.production.database.database;
        const user = config.production.database.user;
        const pw = config.production.database.password;
        const connectionString = 'postgres://'+user+':'+pw+'@'+host+':5432/'+ database;
        const client = new pg.Client(connectionString);
        client.connect(function (err) {
            if (err) return callback(err, null);

            // execute a query on our database
            client.query('INSERT INTO users(username, password) VALUES($1, $2);',
                [username, password]
                , function (err, result) {
                if (err) return callback(err, null);
                return callback(null, result)
            });
        });
    },

    read_everything_from_table: function (callback) {
        const host = config.production.database.host;
        const database = config.production.database.database;
        const user = config.production.database.user;
        const pw = config.production.database.password;
        const connectionString = 'postgres://'+user+':'+pw+'@'+host+':5432/'+ database;
        var client = new pg.Client(connectionString);
        client.connect(function (err) {
            if (err) return callback(err, null);

            // execute a query on our database
            client.query('SELECT * FROM data;', function (err, result) {
                if (err) return callback(err, null);
                return callback(null, result.rows)
            })
        })
    },

    read_names_from_table: function (callback) {
        const host = config.production.database.host;
        const database = config.production.database.database;
        const user = config.production.database.user;
        const pw = config.production.database.password;
        const connectionString = 'postgres://'+user+':'+pw+'@'+host+':5432/'+ database;
        var client = new pg.Client(connectionString);
        client.connect(function (err) {
            if (err) return callback(err, null);

            // execute a query on our database
            client.query('SELECT name FROM data;', function (err, result) {
                if (err) return callback(err, null);
                return callback(null, result.rows)
            })
        })
    }


};

module.exports = database;
