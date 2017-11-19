"use strict";

let config = require('./config'),
    databaseURL = config.databaseURL;

const { Pool, Client } = require('pg')

const pool = new Pool("postgres://btkzzyyrfiixgb:28500bf3f9c17432dc4ab4284aa9baee02ab07a560209b5a78a71b2074a91c87@ec2-50-16-228-232.compute-1.amazonaws.com:5432/d9a4q27eod4akk");


const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();


var configs = {
    user: 'btkzzyyrfiixgb',
    host: 'ec2-50-16-228-232.compute-1.amazonaws.com',
    database: 'd9a4q27eod4akk',
    password: '28500bf3f9c17432dc4ab4284aa9baee02ab07a560209b5a78a71b2074a91c87',
    port: 5432,
};
pool.connect();

exports.query = function (sql, values, singleItem, dontLog) {

    if (!dontLog) {
        console.log(sql, values);
    }

    return new Promise((resolve, reject) => {
                pool.query(sql, values, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(singleItem ? result.rows[0] : result.rows);
                    }
                });
        })
};
