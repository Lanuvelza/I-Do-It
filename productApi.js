const fs = require("fs");
const csv = require('csvtojson');


csv()
  .fromFile("walmart.csv")
  .then((jsonObjArr) => {
    const product = "Product Name";
    jsonObjArr.forEach(json => {
      let lowercaseJson = json[product].toLowerCase();
      if (lowercaseJson.includes("harry potter")) {
        console.log(json[product]);
      }
    });
  });
