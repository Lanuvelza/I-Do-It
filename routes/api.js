require('dotenv').config()
const fetch = require("node-fetch");


let books;
let recipes;
let movies;


async function fetchBookResults(UI) {
  const fetchBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${UI}+intitle:${UI}`)
  const totalResult = await fetchBook.json()
  /*google books is a much larger api because of all the different publicfications (physical, digital, spinoffs etc.)
    so to negate the excess, i ran 100 different books and movies to see the results. /75 is a safe balance (movie always wins if it's a book and
    and movie.*/
  return totalResult.totalItems/75;
  //----------------------------------
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


//populate variables with json data from above
async function amountOfResults (userInput)  {
  books = await fetchBookResults(userInput)
  recipes = await fetchRecipeResults(userInput)
  movies = await fetchMovieResults(userInput)
};
//timeout needed or promise <pending> is returned
const returnObject = (userInput) => {
  amountOfResults(userInput)
  setTimeout(()=> {
    newObj = {
      books,
      recipes,
      movies
    }
    //checks for the highest value in newObj and returns the key of said value
    let max = Math.max.apply(null,Object.keys(newObj).map(function(x){ return newObj[x] }));
    console.log(Object.keys(newObj).filter(function(x){ return newObj[x] == max; })[0]);
    // console.log(Object.keys(newObj).filter(function(x){ return newObj[x] == max; })[0]);  <<<<<<<< how to properly console.log the statement

  }, 750); //not sure how low this number can go
};



 module.exports = returnObject;
