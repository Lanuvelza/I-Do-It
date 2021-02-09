const request = require('request');
require('dotenv').config()
const fetch = require("node-fetch");
const { response } = require('express');

const amountOfResults = (userInput) => {

async  function fetchBookResults() {
    const fetchBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${userInput}+intitle:${userInput}`)
    const totalResult = await fetchBook.json()
    return totalResult.totalItems/75;
  }
async  function fetchRecipeResults() {
    const fetchRecipe = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&apiKey=${process.env.FOOD_API_KEY}`)
    const totalResult = await fetchRecipe.json()
    return totalResult.totalResults;
  }
async  function fetchMovieResults() {
    const fetchBook = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${userInput}`)
    const totalResult = await fetchBook.json()
    return totalResult.total_results
  }
  const arr = [fetchBookResults(), fetchRecipeResults(), fetchMovieResults()]
  let obj = {
  }
  Promise.all(arr).then((values) => {
    return values;
  })
  .then((values) => {
obj = {
  book: values[0],
  recipe: values[1],
  movie: values[2]
}
})

  return obj;
};

console.log(amountOfResults("toy story"));

 module.exports = amountOfResults;
