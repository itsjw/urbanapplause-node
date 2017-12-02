"use strict";
let utils = require('../src/services/utils');
let db = require('./pghelper');
let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

let findAll = (req, res, next) => {

    let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12,
        page = req.query.page ? parseInt(req.query.page) : 1,
        search = req.query.search,
        min = req.query.min,
    max = req.query.max,
    artist_id = req.query.artist_id,
        whereParts = [],
        values = [];

    if (search) {
        values.push(escape(search));
        whereParts.push("work.description || artist.name ~* $" + values.length);
    }
  if (artist_id) {
    values.push(escape(artist_id));
    whereParts.push("artist_id = $1");
  }
    let where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";

    let countSql = "SELECT COUNT(*) from work INNER JOIN artist on work.artist_id = artist.id " + where;

    let sql = "SELECT work.id, work.image, date_posted, description, artist_id, artist.name as artist, location.city as city, location.formatted_address as formatted_address, location.lng as lng, location.lat as lat, user_id, users.username as username " +
    "FROM (((work INNER JOIN artist ON work.artist_id = artist.id) INNER JOIN location ON work.location_id = location.id) INNER JOIN users ON work.user_id = users.id) " + where +
                " ORDER BY work.date_posted DESC LIMIT $" + (values.length + 1) + " OFFSET $" +  + (values.length + 2);
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
    let sql = "SELECT work.id, work.image, date_posted, description, artist_id, artist.name as artist, location.city as city, location.formatted_address as formatted_address, location.lng as lng, location.lat as lat, user_id, users.username as username " +
    "FROM (((work INNER JOIN artist ON work.artist_id = artist.id) INNER JOIN location ON work.location_id = location.id) INNER JOIN users ON work.user_id = users.id) " +
        "WHERE work.id = $1";

    db.query(sql, [id])
        .then(item => res.json(item[0]))
        .catch(next);
};


const submitNew = (req, res, next) => {
  if (!req.body.jwtauth) {
    return res.json({message: "Not authorized"});
  }
  var artist_id = req.body.artist_id||null;
  const new_artist_name = req.body.new_artist_name;
  if (artist_id==null||'null') {
    if(new_artist_name) {
      console.log('creating new artist ' + new_artist_name);
      var newArtistSql = "INSERT INTO artist (name) VALUES ('" + new_artist_name + "') RETURNING artist.id;"
    } else {
      artist_id = 0;
    }
  }
  let image = req.body.image;
  let description = req.body.description;
  let user_id = req.body.jwtauth.id;
  let place = JSON.parse(req.body.place);
  let lng = place.geometry.location.lng;
  let lat = place.geometry.location.lat;
  let formatted_address = place.formatted_address;
  let city = utils.getAddressComponents(place).City.short_name;

  let locationSql = "INSERT INTO location (lng, lat, formatted_address, city) VALUES (" + lng + ", " + lat + ", '" + formatted_address + "', '" + city + "') RETURNING id;";

  db.query(locationSql)
    .then((id) => {
      var sql = "INSERT INTO work (id, description, artist_id, image,  date_posted, location_id, user_id) VALUES (DEFAULT, '" + description + "', $1,  $$" + image + "$$, DEFAULT, " + id[0].id + ", '" + user_id + "') RETURNING work.id;";
      if(newArtistSql) {
        db.query(newArtistSql)
          .then((item) => {
            console.log('CREATED NEW ARTIST WITH ID ', item[0].id);
            db.query(sql, [item[0].id])
              .then((item) => {
                console.log('CREATED NEW WORK WITH NEW ARTIST');
              return res.json(item[0]);
            });
          });
      } else {
      db.query(sql, [artist_id])
          .then((item) => {
            console.log('CREATED NEW WORK WITH EXISTING OR NULL ARTIST');
          return res.json(item[0]);
        });
      }
    });
}

let deleteWork = (req, res, next) => {
  let id = req.params.id;

  let sql = "DELETE FROM work WHERE work.id = $1";

  db.query(sql, [id])
      .then(item => res.json())
      .catch(next);

}
exports.deleteWork = deleteWork;
exports.submitNew = submitNew;
exports.findAll = findAll;
exports.findById = findById;
