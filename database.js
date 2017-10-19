"use strict"

const { Pool } = require('pg');

// Connect to database
let pool = undefined
if(process.env.NODE_ENV === 'production') {
    const connectionString = process.env.DATABASE_URL
    pool = new Pool({ connectionString: connectionString })
    
    // Setup error logging in production only
    pool.on('error', (err, client) => {
        Raven.captureException(err);
    });
} else {
    const connectionString = 'postgres://' + process.env.PSQL_USER + ':' + process.env.PSQL_PW + '@localhost:5432/arkad-search';
    pool = new Pool({ connectionString: connectionString });
}

var database = {

    insert_search_into_database: function (name, time, date, info, callback) {
        pool.query('INSERT INTO data(name, time, date, info) VALUES($1, $2, $3, $4)',
            [name, time, date, info]
            , function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result)
        })
    },
    
    read_entry: function (id, callback) {
        pool.query('SELECT * FROM data WHERE id = $1',
            [id]
            , function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result)
        })
    },
    
    update_entry: function (ent, callback) {
        pool.query('UPDATE data SET name = $1, time = $2, date = $3, info = $4 WHERE id = $5',
            [ent.name, ent.time, ent.date, ent.info, ent.id]
            , function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result)
        })
    },

    delete_search: function (id, callback) {
        pool.query('DELETE FROM data WHERE id = $1',
            [id]
            , function (err, result) {
                if (err) return callback(err, null);
                return callback(null, result);
            })
    },

    get_user: function(username, callback) {
        pool.query('SELECT * FROM users where username = $1 ',
            [username]
            , function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result)
        })
    },

    add_user: function(username, password, callback) {
        pool.query('INSERT INTO users(username, password) VALUES($1, $2);',
            [username, password]
            , function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result)
        });
    },

    read_everything_from_table: function (callback) {
        pool.query('SELECT * FROM data;', function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result.rows)
        })
    },

    read_users_from_table: function (callback) {
        pool.query('SELECT username, admin FROM users;', function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result.rows)
        })
    },

    read_names_from_table: function (callback) {
        pool.query('SELECT name FROM data;', function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result.rows)
        })
    },

    update_admin_permission: function (ent, callback) {
        pool.query('UPDATE users SET admin = $2 WHERE username = $1',
            [ent.username, ent.admin]
            , function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result)
        })
    },

    delete_user: function (ent, callback) {
        pool.query('DELETE FROM users WHERE username = $1',
            [ent.username]
            , function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result);
        })
    },

};

module.exports = database;
