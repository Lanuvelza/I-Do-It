/*
 * All routes for todos are defined here
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // retrieves all the todos from database
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM todos;`)
      .then(data => {
        const todos = data.rows;
        res.json({ todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // retrieves all the todos from a user id
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM todos WHERE id = $1`,
    [req.params.id])
      .then(data => {
        const todos = data.rows;
        res.json({todos});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // inserts a new todo into the database
  router.post("/", (req, res) => {
    const user_id = 1;
    const category_id = 1;
    const title = req.body.new_todo;
    const created_date = '07-07-2020';
    db.query(`
    INSERT INTO todos
    (user_id, category_id, title, created_date)
    VALUES
    ($1, $2, $3, $4)
    `,[user_id, category_id, title, created_date]);
  });

  return router;

};
