/*
 * All routes for categories are defined here
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // retrieves all the categories from database
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM categories;`)
      .then(data => {
        // console.log(data);
        const categories = data.rows;
        res.json({ categories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;


};
