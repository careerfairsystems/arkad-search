var pg = require('pg')

var database = {

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
