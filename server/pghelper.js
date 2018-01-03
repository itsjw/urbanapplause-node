"use strict";

const productionConfigs = {
  user: 'flannerykj',
  host: 'localhost',
  database: 'urbanapplause',
  password: 'cheesecake',
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

  const pool = new Client(productionConfigs);
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
