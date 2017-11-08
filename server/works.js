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
        whereParts.push("work.name || work.tags || artist.name ~* $" + values.length);
    }
    /*if (min) {
        values.push(parseFloat(min));
        whereParts.push("work.alcohol >= $" + values.length);
    }
    if (max) {
        values.push(parseFloat(max));
        whereParts.push("work.alcohol <= $" + values.length);
    }*/

    let where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";

    let countSql = "SELECT COUNT(*) from work INNER JOIN artist on work.artist_id = artist.id " + where;

    let sql = "SELECT work.id, work.name, work.tags, work.image, artist.name as artist, city.name as city " +
    "FROM ((work INNER JOIN artist ON work.artist_id = artist.id) INNER JOIN city ON work.city_id = city.id) " + where +
                " ORDER BY work.name LIMIT $" + (values.length + 1) + " OFFSET $" +  + (values.length + 2);

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
};

let findById = (req, res, next) => {
    let id = req.params.id;

    let sql = "SELECT work.id, work.description, tags, image, artist.name as artist FROM work " +
        "INNER JOIN artist on work.artist_id = artist.id " +
        "WHERE work.id = $1";

    db.query(sql, [id])
        .then(item => res.json(item[0]))
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
