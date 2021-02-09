const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get("/", (req, res) => {
    res.send("login page");
  });


  // get /login/:id
  router.get("/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/dash');
    console.log(req.session.user_id);
  });
  return router;

};


