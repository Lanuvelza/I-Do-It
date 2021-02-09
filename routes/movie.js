const request = require('request');

console.log(process.argv.slice(2).join(" "));

// movie api from https://www.themoviedb.org/
const api = ``;

// get movies by title
const fetchMovie = function(query) {
  query = process.argv.slice(2).join(" ");
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&language=en-US&query=${query}`
  request(url, function (error, response, body) {
    if (error) throw new Error(error);
    data = JSON.parse(body);
    console.log(data);
    // console.log(data.results);
  });
};
