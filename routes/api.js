require('dotenv').config();
const fetch = require("node-fetch");


let book;
let recipe;
let movie;
const product = 25;

async function fetchBookResults(UI) {

  const fetchBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${UI}`);
  const totalResult = await fetchBook.json();
  return totalResult.totalItems/11.75;
};

async function fetchRecipeResults(UI) {
  const fetchRecipe = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${UI}&apiKey=${process.env.FOOD_API_KEY}`);
  const totalResult = await fetchRecipe.json();
  return totalResult.totalResults * 1.75;
};

async function fetchMovieResults(UI) {
  const fetchMovie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${UI}`);
  const totalResult = await fetchMovie.json();
  return totalResult.total_results * 1.735;
};

// async function fetchProductResults(UI) {
//   const fetchProduct = await fetch(`https://api.rainforestapi.com/request?api_key=${process.env.PRODUCT_API_KEY}&type=search&amazon_domain=amazon.nl&search_term=${UI}&refinement=p_72/3014475011`);
//   const totalResult = await fetchProduct.json();
//   return totalResult.search_results.length/2.2;
// };

//populate variables with json data from above
async function amountOfResults (userInput)  {
   book = await fetchBookResults(userInput);
   recipe = await fetchRecipeResults(userInput);
   movie = await fetchMovieResults(userInput);
  //  product = await fetchProductResults(userInput);
 };

//removed time out and added async/await
const largestObjectKey = async (userInput) => {

   await amountOfResults(userInput)
    newObj = {
      book,
      recipe,
      movie,
      product
    };
    console.log('which is the highest? is is being returned correct?', newObj)


    const max = Math.max.apply(null,Object.keys(newObj).map(function(x) {
      return newObj[x]
    }));

    const temp = Object.keys(newObj).filter(function(x) {
      return newObj[x] == max; })[0];
        return temp;
};



 module.exports = largestObjectKey;
