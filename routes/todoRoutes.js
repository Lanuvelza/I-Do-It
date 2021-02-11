/*
 * All routes for todos are defined here
 */

const express = require('express');
const router = express.Router();
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
    WHERE user_id = $1 AND is_active = TRUE
    ORDER BY id ASC;`,
      [req.session.user_id])
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

  // inserts a new todo into the database
  router.post("/", async (req, res) => {

    const user_id = req.session.user_id;
    const title = req.body.new_todo[0];
    const created_date = new Date();
    const scheduled_date = req.body.new_todo[1];
    let category_id;


    //pause and wait for this to complete
    const category = await largestObjectKey(title);
    switch (category) {
      case 'product':
        category_id = 1;
        break;
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
    (user_id, category_id, title, created_date, scheduled_date)
    VALUES
    ($1, $2, $3, $4, $5);
    `, [user_id, category_id, title, created_date, scheduled_date])
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

  // deletes a todo from the database
  router.post("/delete", (req, res) => {
    console.log("here in delete");
    console.log(req.body);

    db.query(`DELETE FROM todos
    WHERE id = $1;`,
      [req.body.id])
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

  //edit a todo from the database
  router.post("/edit", (req, res) => {

    // console.log("here in edit");
    // console.log(JSON.parse(req.body));
    // const updatedTodo = JSON.parse(req.body.todo)
    // console.log("NEW TITLE", req.body);
    db.query(`UPDATE todos
    SET title = $1, scheduled_date = $2, category_id = $3 WHERE id = $4;`, [req.body.title, req.body.scheduled_date, req.body.category_id, req.body.id])
      .then(data => {
        // console.log("This is data", data);
        const todos = data.rows;
        // console.log('rows', todos);
        res.json({ todos });
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  // marks a todo as inactive/completed
  router.post("/complete", (req, res) => {
    console.log("here in complete");
    console.log(req.body.id);

    db.query(`UPDATE todos SET is_active = FALSE
    WHERE id = $1`, [req.body.id])
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

  // retrieves todos from the buy category
  router.get("/:id/buy", (req, res) => {
    console.log("here in buy");
    console.log(req.session.user_id);
    db.query(`SELECT * FROM todos
    WHERE user_id = $1 AND category_id = 1 AND is_active = TRUE
    ORDER BY id ASC;`,
    [req.session.user_id])
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

  // retrieves todos from the eat category
  router.get("/:id/eat", (req, res) => {
    db.query(`SELECT * FROM todos
    WHERE user_id = $1 AND category_id = 2 AND is_active = TRUE
    ORDER BY id ASC;`,
    [req.session.user_id])
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

  // retrieves todos from the read category
  router.get("/:id/read", (req, res) => {
    db.query(`SELECT * FROM todos
    WHERE user_id = $1 AND category_id = 3 AND is_active = TRUE
    ORDER BY id ASC;`,
    [req.session.user_id])
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

  // retrieves todos from the watch category
  router.get("/:id/watch", (req, res) => {
    db.query(`SELECT * FROM todos
    WHERE user_id = $1 AND category_id = 4 AND is_active = TRUE
    ORDER BY id ASC;`,
    [req.session.user_id])
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

  // retrieves todos from the completed category
  router.get("/:id/completed", (req, res) => {
    db.query(`SELECT * FROM todos
    WHERE user_id = $1 AND is_active = FALSE
    ORDER BY id ASC;`,
    [req.session.user_id])
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

  return router;
}
