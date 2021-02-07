// index.js
const { fetchBook, fetchRecipe } = require('./tinkering');

fetchBook((error, book) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned books:' , book);
});

fetchRecipe((error, recipe) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned recipes:' , recipe);
});
