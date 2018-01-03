"use strict";
let utils = require('../src/services/utils');
let db = require('./pghelper');
let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');


let findByWorkId = (req, res, next) => {
  let work_id = req.params.work_id,
  whereParts = [],
  values = [];

  console.log('finding comments for work of id ', work_id);
  if (work_id) {
    values.push(escape(work_id));
    whereParts.push("work_id = $1");
  }

  let where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";

  let countSql = "SELECT COUNT(*) from comments INNER JOIN work on comments.work_id = work.id " + where;

  let sql = "SELECT comments.id, comments.date_posted, comments.text, work.id as work_id, comments.user_id, users.username as username " +
    "FROM ((comments INNER JOIN work ON comments.work_id = work.id) INNER JOIN users ON comments.user_id = comments.user_id) " + where +
    " ORDER BY comments.date_posted;";

  db.query(countSql, values)
    .then(result => {
      let total = parseInt(result[0].count);
      db.query(sql, values)
        .then(items => {
          console.log(items)
          return res.json({"total": total, "items": items});
        })
        .catch(next);
    })
    .catch(next);
  }



const submitNew = (req, res, next) => {
  console.log(req.body);
  var user_id = req.body.user_id;
  let text = req.body.text;
  let work_id= req.body.work_id;
  let date_posted = req.body.date_posted;

  var sql = "INSERT INTO comments (user_id, work_id, text, date_posted) VALUES (" + user_id + ", " + work_id + ", " + "'" + text + "', DEFAULT) RETURNING comments.id;";

  db.query(sql)
    .then((id) => {
      return res.json({successful: true, data: id});
    })
}

let deleteComment = (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM comments WHERE comments.id = $1";
  db.query(sql, [id])
    .then(item => res.json())
    .catch(next);
}

exports.deleteComment = deleteComment;
exports.submitNew = submitNew;
exports.findByWorkId = findByWorkId;
