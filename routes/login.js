const express = require('express');
const router = express.Router();


module.exports = (db) => {

  // renders the login page
  router.get("/", (req, res) => {
    if (!req.session.user_id) {
      res.render("userLogin");
    }
    res.redirect('/dash');
  });

  // get /login/:id
  router.get("/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/dash');
  });

  // route to post login
  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`SELECT * FROM users
    WHERE email = $1`, [email])
    .then(data => {
      if (password === data.rows[0].password) {
        req.session.user_id = data.rows[0].id;
        console.log(req.session.user_id);
        res.redirect('/dash');
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;

};


