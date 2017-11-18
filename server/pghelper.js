"use strict";

let config = require('./config'),
    databaseURL = config.databaseURL;

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ua',
  password: 'cheesecake',
  port: 5432,
})

pool.connect();

exports.query = function (sql, values, singleItem, dontLog) {

    if (!dontLog) {
        console.log(sql, values);
    }

    return new Promise((resolve, reject) => {
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                client.query(sql, values, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(singleItem ? result.rows[0] : result.rows);
                    }
                });
        })
    })
};
