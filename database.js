var pg = require('pg')

var database = {

    setup_connection: function(callback) {
        let connectionString = "";
        if (process.env.NODE_ENV == "production") {
            connectionString = process.env.DATABASE_URL;
        } else {
            const user = process.env.PSQLUSER;
            const pw = process.env.PSQLPW;
            connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
        }
        return callback(new pg.Client(connectionString));
    },

    insert_search_into_database: function (name, time, date, info, callback) {
        this.setup_connection(client => {
        client.connect(function (err) {
                if (err) return callback(err, null);

                // execute a query on our database
                client.query('INSERT INTO data(name, time, date, info) VALUES($1, $2, $3, $4)',
                    [name, time, date, info]
                    , function (err, result) {
                    if (err) return callback(err, null);
                    return callback(null, result)
                })
            })
        })
    },
    get_user: function(username, callback) {
        this.setup_connection(client => {
        client.connect(function (err) {
                if (err) return callback(err, null);

                // execute a query on our database
                client.query('SELECT * FROM users where username = $1 ',
                    [username]
                    , function (err, result) {
                    if (err) return callback(err, null);
                    return callback(null, result)
                })
            })
        })
    },

    add_user: function(username, password, callback) {
        this.setup_connection(client => {
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
        })
    },

    read_everything_from_table: function (callback) {
        this.setup_connection(client => {
            client.connect(function (err) {
                if (err) return callback(err, null);

                // execute a query on our database
                client.query('SELECT * FROM data;', function (err, result) {
                    if (err) return callback(err, null);
                    return callback(null, result.rows)
                })
            })
        })
    },

    read_names_from_table: function (callback) {
        this.setup_connection(client => {
            client.connect(function (err) {
                if (err) return callback(err, null);

                // execute a query on our database
                client.query('SELECT name FROM data;', function (err, result) {
                    if (err) return callback(err, null);
                    return callback(null, result.rows)
                })
            })
        })
    }


};

module.exports = database;
