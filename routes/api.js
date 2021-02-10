require('dotenv').config()
const fetch = require("node-fetch");


let book;
let recipe;
let movie;

async function fetchBookResults(UI) {

  const fetchBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${UI}+intitle:${UI}`)
  const totalResult = await fetchBook.json()
  /*google books is a much larger api because of all the different publicfications (physical, digital, spinoffs etc.)
    so to negate the excess, i ran 100 different books and movies to see the results. /72 is a safe balance (movie always wins if it's a book and
    and movie.*/
  return totalResult.totalItems/72;
  //----------------------------------
}
async function fetchRecipeResults(UI) {
  const fetchRecipe = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${UI}&apiKey=${process.env.FOOD_API_KEY}`);
  const totalResult = await fetchRecipe.json();
  return totalResult.totalResults;
}
async function fetchMovieResults(UI) {
  const fetchMovie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${UI}`);
  const totalResult = await fetchMovie.json();
  return totalResult.total_results;
};

//populate variables with json data from above
async function amountOfResults (userInput);  {
   book = await fetchBookResults(userInput);
   recipe = await fetchRecipeResults(userInput);
   movie = await fetchMovieResults(userInput);
 };

//removed time out and added async/await
const largestObjectKey = async (userInput) => {

  await amountOfResults(userInput)
    newObj = {
      book,
      recipe,
      movie
    };
    console.log('which is the highest? is is being returned correct?', newObj)


    let max = Math.max.apply(null,Object.keys(newObj).map(function(x) {
      return newObj[x]
    }));

    const temp = Object.keys(newObj).filter(function(x) {
      return newObj[x] == max; })[0];
        return temp;
};



 module.exports = largestObjectKey;
