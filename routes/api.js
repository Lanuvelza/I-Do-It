require('dotenv').config()
const fetch = require("node-fetch");

let books;
let recipes;
let movies;

let obj = {}

async function fetchBookResults(UI) {
  const fetchBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${UI}+intitle:${UI}`)
  const totalResult = await fetchBook.json()
  return totalResult.totalItems/75;
}
async function fetchRecipeResults(UI) {
  const fetchRecipe = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${UI}&apiKey=${process.env.FOOD_API_KEY}`)
  const totalResult = await fetchRecipe.json()
  return totalResult.totalResults;
}
async function fetchMovieResults(UI) {
  const fetchBook = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${UI}`)
  const totalResult = await fetchBook.json()
  return totalResult.total_results
}



async function amountOfResults (userInput)  {

books = await fetchBookResults(userInput)
recipes = await fetchRecipeResults(userInput)
movies = await fetchMovieResults(userInput)
setTimeout(()=> {console.log(books)
  obj = {
    books,
    recipes,
    movies
  }

  console.log(obj)
  }, 2000)

}
amountOfResults("pasta")


 module.exports = amountOfResults;
