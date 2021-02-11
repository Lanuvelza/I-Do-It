const express = require('express');
const router = express.Router();


module.exports = (db) => {

  // route to post logout
  // redirects back to the main page
  router.post("/", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
  });

  return router;
};


