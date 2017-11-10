"use strict";

let db = require('./pghelper');

let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

let findAll = (req, res, next) => {

    let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12,
        page = req.query.page ? parseInt(req.query.page) : 1,
        search = req.query.search,
        min = req.query.min,
        max = req.query.max,
        whereParts = [],
        values = [];

    if (search) {
        values.push(escape(search));
        whereParts.push("artist.name || artist.tags || artist.city  ~* $" + values.length);
    }

    let where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";

    let countSql = "SELECT COUNT(*) from artist INNER JOIN city on artist.city_id = city.id " + where;

    let sql = "SELECT artist.id, artist.name, city.name as city " +
                "FROM artist INNER JOIN city on artist.city_id = city.id " + where +
                " ORDER BY artist.name LIMIT $" + (values.length + 1) + " OFFSET $" +  + (values.length + 2);

    db.query(countSql, values)
        .then(result => {
            let total = parseInt(result[0].count);
            db.query(sql, values.concat([pageSize, ((page - 1) * pageSize)]))
                .then(items=> {
                    return res.json({"pageSize": pageSize, "page": page, "total": total, "items": items});
                })
                .catch(next);
        })
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
  let sql = "SELECT artist.id, artist.name, artist.bio, website, email, experience, city.name as city FROM artist " +
    "INNER JOIN city on artist.city_id = city.id " +
    "WHERE artist.id = $1";

    db.query(sql, [id])
        .then(item => res.json(item[0]))
        .catch(next);
};


let submitNew = (req, res, next) => {
  let artist_id = req.body.artist_id;
  let image = req.body.image;
  let description = req.body.description;
  let city_id = 2;

  let sql = "INSERT INTO work (description, artist_id, image, city_id, date_posted) VALUES ('" + description + "', " + artist_id + ", $$" + image + "$$, " + city_id + ", DEFAULT);"

  db.query(sql)
    .then((error) => console.log(result));

}
exports.submitNew = submitNew;

exports.findById = findById;
exports.findAll = findAll;
