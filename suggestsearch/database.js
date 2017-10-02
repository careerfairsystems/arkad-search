var pg = require('pg')

var database = {

    insert_search_into_database: function (name, time, date, info, callback) {
        var user = process.env.PSQLUSER
        var pw = process.env.PSQLPW
        const connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
        var client = new pg.Client(connectionString);
        client.connect(function (err) {
            if (err) throw err;

            // execute a query on our database
            console.log('RUNNING query');
            client.query('INSERT INTO data(name, time, date, info) VALUES($1, $2, $3, $4)',
                [name, time, date, info]
                , function (err, result) {
                if (err) throw err;
                return callback(null, result)
            })
        })
    },


    read_everything_from_table: function (callback) {
        var user = process.env.PSQLUSER
        var pw = process.env.PSQLPW
        const connectionString = 'postgres://'+user+':'+pw+'@localhost:5432/arkad-search';
        var client = new pg.Client(connectionString);
        client.connect(function (err) {
            if (err) throw err;

            // execute a query on our database
            client.query('SELECT * FROM data;', function (err, result) {
                if (err) throw err;
                return callback(null, result)
            })
        })
    }

};

module.exports = database;
