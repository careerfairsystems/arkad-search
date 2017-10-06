var pg = require('pg')

var database = {

    insert_search_into_database: function (name, time, date, info, callback) {
        var user = "osseman"
        var pw = ""
        const connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
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
        var user = "osseman"
        var pw = ""
        const connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
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
        const user = "osseman"
        const pw = ""
        const connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
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
        var user = process.env.PSQLUSER
        var pw = process.env.PSQLPW
        const connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
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
        var user = process.env.PSQLUSER
        var pw = process.env.PSQLPW
        const connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
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
