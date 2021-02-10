require('dotenv').config();
const fetch = require("node-fetch");


let book;
let recipe;
let movie;
let product;

function fetchBookResults(UI) {

  const fetchBook = fetch(`https://www.googleapis.com/books/v1/volumes?q=${UI}+intitle:${UI}`);
  const totalResult = fetchBook.json();
  /*google books is a much larger api because of all the different publicfications (physical, digital, spinoffs etc.)
    so to negate the excess, i ran 100 different books and movies to see the results. /72 is a safe balance (movie always wins if it's a book and
    and movie.*/
  return totalResult.totalItems/72;
  //----------------------------------
}
function fetchRecipeResults(UI) {
  const fetchRecipe = fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${UI}&apiKey=${process.env.FOOD_API_KEY}`);
  const totalResult = fetchRecipe.json();
  return totalResult.totalResults;
}
function fetchMovieResults(UI) {
  const fetchMovie = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${UI}`);
  const totalResult = fetchMovie.json();
  return totalResult.total_results;
};
function fetchProductResults(UI) {
  const fetchProduct = fetch(`https://api.rainforestapi.com/request?api_key=${process.env.PRODUCT_API_KEY}&type=search&amazon_domain=amazon.ca&search_term=${UI}`)
  const totalResult = fetchProduct.json()
  return totalResult['pagination'].total_results/130
}

//populate variables with json data from above
async function amountOfResults (userInput)  {
   book = await fetchBookResults(userInput);
   recipe = await fetchRecipeResults(userInput);
   movie = await fetchMovieResults(userInput);
   product = await fetchProductResults(userInput);
 };

//removed time out and added async/await
const largestObjectKey = async (userInput) => {

  await amountOfResults(userInput)
    newObj = {
      book,
      recipe,
      movie, product
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
