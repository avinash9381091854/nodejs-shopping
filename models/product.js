const fs = require('fs');
const path = require('path');

const productsFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(productsFile, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      // If there is no error then the file exists and we can read the
      // products
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save = () => {
    getProductsFromFile(products => {
      products.push(this);
      // Persists the products to the file
      fs.writeFile(productsFile, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    })
  };

  static fetchAll = (callback) => {
    getProductsFromFile(callback);
  };
};