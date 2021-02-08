const db = require('/db');



const getUserById = function (id) {
  const queryStr = `
  SELECT * FROM users
  WHERE id = $1;`;
  return db.query(queryStr, [id])
    .then(res => {
      if (res.row) {
        return res.row[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      return console.log('ERROR OCCURED in userById', err);
    })
};
exports.getUserById = getUserById;


const getUserByEmail = function (email) {
  const queryStr = `
  SELECT * FROM users
  WHERE email = $1;`;
  return db.query(queryStr, [email])
    .then(res => {
      if (res.row) {
        return res.row[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      return console.log('ERROR OCCURED in userByEmail', err);
    })
};
exports.getUserByEmail = getUserByEmail;


const getUserTodos = function (id, limit = 10) {
  const queryStr = `
  SELECT
  users.id as user_id,
  todos.*
FROM
  todos
  JOIN users ON todos.user_id = users.id
WHERE
  user_id = $1
  LIMIT $2;`;
  return db.query(queryStr, [id, limit])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return console.log('ERROR OCCURED in userByEmail', err);
    })
};


