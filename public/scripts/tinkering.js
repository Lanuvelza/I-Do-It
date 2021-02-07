const request = require('request');
require('dotenv').config()

const test = process.argv.splice(2).join("+");
const  fetchRecipe = function(callback) {
  request(`https://api.spoonacular.com/recipes/complexSearch?query=${test}&apiKey=${process.env.API_KEY}`, (error, response, body) => {
    if (error) return callback(error, null); //if error, error
    if (response.statusCode !== 200) { //if the response is anything but 200 (aka response ok)
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    //store data in arr
    const arr = JSON.parse(body).results
    const recipes = []
    //push titles of books listed in arr and push into books
    for (let x = 0; x < arr.length; x++) {
      recipes.push(arr[x].title);
    }
    callback(null, recipes);
  });
};

const  fetchBook = function(callback) {
  request(`https://www.googleapis.com/books/v1/volumes?q=${test}`, (error, response, body) => {
    if (error) return callback(error, null); //if error, error
    if (response.statusCode !== 200) { //if the response is anything but 200 (aka response ok)
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    //store data in arr
    const arr = JSON.parse(body).items
    const books = []
    //push titles of books listed in arr and push into books
    for (let x = 0; x < arr.length; x++) {
      books.push(arr[x].volumeInfo.title);
    }
    callback(null, books);
  });
};



module.exports = { fetchBook , fetchRecipe};
