var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/productController');


//get products by category
router.route('/api/product/category').
    get(ctrl.fetchProductsByCategory);
//get product by id
router.route('/api/product/:id').
    get(ctrl.fetchProductById);
//get all products
router.route('/api/product').
    get(ctrl.fetchAllProducts);
//create new product
router.route('/api/product').
    post(ctrl.createNewProduct);



module.exports = router;