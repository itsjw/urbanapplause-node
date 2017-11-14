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
        whereParts.push("artist.name ~* $" + values.length);
    }

    let where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";

    let countSql = "SELECT COUNT(*) from artist " + where;

    let sql = "SELECT artist.id, artist.name " +
                "FROM artist  " + where +
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
  let sql = "SELECT artist.id, artist.name, artist.bio, website, email, experience FROM artist " +
    "WHERE artist.id = $1";

    db.query(sql, [id])
        .then(item => res.json(item[0]))
        .catch(next);
};


let submitNew = (req, res, next) => {
  let name = req.body.name;
  let sql = "INSERT INTO artist (name) VALUES ('" + name + "');"

  db.query(sql)
    .then((error) => console.log(error));

}
exports.submitNew = submitNew;

exports.findById = findById;
exports.findAll = findAll;
