"use strict";

const productionConfigs = {
  url: process.env.DATABASE_URL,
  user: 'btkzzyyrfiixgb',
  host: 'ec2-50-16-228-232.compute-1.amazonaws.com',
  database: 'd9a4q27eod4akk',
  password: '28500bf3f9c17432dc4ab4284aa9baee02ab07a560209b5a78a71b2074a91c87',
  port: 5432,
  ssl: true
}

const devConfigs = {
  url: process.env.DATABASE_URL,
  user: 'postgres',
  host: 'localhost',
  database: 'urbanapplause',
  password: 'cheesecake',
  port: 2000
}



const { Pool, Client } = require('pg')


exports.query = function (sql, values, singleItem, dontLog) {

  const pool = new Client(devConfigs);
  if (!dontLog) {
    //console.log(sql, values);
  }

  return new Promise((resolve, reject) => {
    pool.connect(function(err, client, done) {
      if (err) {
        reject(err);
      }
      pool.query(sql, values, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(singleItem ? result.rows[0] : result.rows);
        }
      });
      done;
    });
  });
};
