"use strict";

let db = require('./pghelper');

let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
let findAll0 = (req, res, next) => {
  let sql = `ALTER TABLE artist ADD COLUMN email VARCHAR(350);`;

let sql4 = `CREATE TABLE work (
 id serial PRIMARY KEY,
 artist_id integer REFERENCES artist (id),
 description VARCHAR (500),
 location_id integer REFERENCES location (id),
  date_posted timestamp with time zone NOT NULL DEFAULT now(),
  image text
);`
  let sql0 = "SELECT table_name FROM information_schema.tables WHERE table_schema='public';";
  db.query(sql)
        .then(item => res.json(item))
        .catch(next);
}
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
                "FROM public.artist  " + where +
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
  let sql = "select *, ( select array(SELECT w.id FROM work w WHERE w.artist_id = $1 ORDER BY w.date_posted DESC LIMIT 3 )) as works from artist a WHERE a.id = $1 ;";

    db.query(sql, [id])
        .then(item => res.json(item[0]))
        .catch(next);
};


let updateById = (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;
  let bio = req.body.bio;
  let website = req.body.website;
  let email = req.body.email;
  let sql = "UPDATE artist SET name='" + name + "', bio='" + bio + "', website='" + website + "', email='" + email + "' WHERE id=" + id + " RETURNING id; "

  db.query(sql)
    .then((error) => console.log(error));
}

let submitNew = (req, res, next) => {
  let name = req.body.name;
  let sql = "INSERT INTO artist (name) VALUES ('" + name + "');"

  db.query(sql)
    .then((error) => console.log(error));

}
exports.submitNew = submitNew;
exports.updateById = updateById;
exports.findById = findById;
exports.findAll = findAll;
