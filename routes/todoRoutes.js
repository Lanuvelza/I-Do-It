/*
 * All routes for todos are defined here
 */

const express = require('express');
const router  = express.Router();
const largestObjectKey = require('./api.js')

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
    db.query(`SELECT * FROM todos
    JOIN users ON todos.user_id = users.id
    WHERE user_id = $1`,
    [req.session.user_id])
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
  router.post("/", async (req, res) => {

    const user_id = req.session.user_id;
    const title = req.body.new_todo;
    const created_date = '07-07-2020';
    let category_id;

    //pause and wait for this to complete
    const category = await largestObjectKey(title);
      switch (category) {
        case 'recipe':
          category_id = 2;
          break;
        case 'book':
          category_id = 3;
          break;
        case 'movie':
          category_id = 4;

          break;
      }

    db.query(`
    INSERT INTO todos
    (user_id, category_id, title, created_date)
    VALUES
    ($1, $2, $3, $4);
    `,[user_id, category_id, title, created_date])
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

  return router;
  }
