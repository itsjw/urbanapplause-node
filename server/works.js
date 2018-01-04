"use strict";
let utils = require('../src/services/utils');
let db = require('./pghelper');
let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const { check, validationResult } = require('express-validator/check');

let findAll = (req, res, next) => {
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8,
    page = req.query.page ? parseInt(req.query.page) : 1,
    search = req.query.search,
    min = req.query.min,
    max = req.query.max,
    artist_id = req.query.artist_id,
    whereParts = [],
    values = [];

  if (search) {
        values.push(escape(search));
        whereParts.push("works.description || artists.name ~* $" + values.length);
  }
  if (artist_id) {
    values.push(escape(artist_id));
    whereParts.push("artist_id = $1");
  }
  let where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";
  let countSql = "SELECT COUNT(*) from works INNER JOIN artists on works.artist_id = artists.id " + where;
  let sql = "SELECT works.id, works.image, date_posted, description, artist_id, artists.name as artist, locations.city as city, locations.formatted_address as formatted_address, locations.lng as lng, locations.lat as lat, user_id, users.username as username " +
    "FROM (((works INNER JOIN artists ON works.artist_id = artists.id) INNER JOIN locations ON works.location_id = locations.id) INNER JOIN users ON works.user_id = users.id) " + where +
    " ORDER BY works.date_posted DESC LIMIT $" + (values.length + 1) + " OFFSET $" +  + (values.length + 2);

  db.query(countSql, values)
    .then(result => {
      let total = parseInt(result[0].count);
      db.query(sql, values.concat([pageSize, ((page - 1) * pageSize)]))
        .then(items => {
          return res.json({"pageSize": pageSize, "page": page, "total": total, "items": items});
        })
        .catch(next);
    })
    .catch(next);
  }

let findById = (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT works.id, works.image, date_posted, description, artist_id, artists.name as artist, locations.city as city, locations.formatted_address as formatted_address, locations.lng as lng, locations.lat as lat, user_id, users.username as username " +
    "FROM (((works INNER JOIN artists ON works.artist_id = artists.id) INNER JOIN locations ON works.location_id = locations.id) INNER JOIN users ON works.user_id = users.id) " +
    "WHERE works.id = $1";

  db.query(sql, [id])
    .then(item => res.json(item[0]))
    .catch(next);
};

const submitNew = (req, res, next) => {
  var artist_id = req.body.artist_id||null;
  const new_artist_name = req.body.new_artist_name;
  if (artist_id==null||'null') {
    if(new_artist_name) {
      console.log('creating new artist ' + new_artist_name);
      var newArtistSql = "INSERT INTO artists (name) VALUES ('" + new_artist_name + "') RETURNING artists.id;"
    } else {
      artist_id = 0;
    }
  }
  let image = req.body.image;
  let description = req.body.description;
  let user_id = req.body.user_id;
  let place = JSON.parse(req.body.place);
  let lng = place.geometry.location.lng;
  let lat = place.geometry.location.lat;
  let formatted_address = place.formatted_address;
  let city = place.city||utils.getAddressComponents(place).City.short_name;

  let locationSql = "INSERT INTO locations (lng, lat, formatted_address, city) VALUES (" + lng + ", " + lat + ", '" + formatted_address + "', '" + city + "') RETURNING id;";

  db.query(locationSql)
    .then((id) => {
      var sql = "INSERT INTO works (id, description, artist_id, image,  date_posted, location_id, user_id) VALUES (DEFAULT, '" + description + "', $1,  $$" + image + "$$, DEFAULT, " + id[0].id + ", '" + user_id + "') RETURNING works.id;";
      if(newArtistSql) {
        db.query(newArtistSql)
          .then((item) => {
            db.query(sql, [item[0].id])
              .then((item) => {
              return res.json({successful: true, data: item[0]});
            });
          });
      } else {
      db.query(sql, [artist_id])
          .then((item) => {
            return res.json({successful: true, data: item[0]});
        });
      }
    });
}

let deleteWork = (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM works WHERE works.id = $1";
  db.query(sql, [id])
    .then(item => res.json())
    .catch(next);
}


exports.deleteWork = deleteWork;
exports.submitNew = submitNew;
exports.findAll = findAll;
exports.findById = findById;
