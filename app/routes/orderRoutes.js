var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/orderController');

//returns all orders and order detils by customer id
router.route('/api/order/:customer_id').
    get(ctrl.fetchOrderDataById);

//creates new order with order details
//order must have at least one order detail
router.route('/api/order').
    post(ctrl.createNewOrder);

//modifies order details by order id
//receives a list of order details
router.route('/api/order_details/:order_id').
    put(ctrl.updateOrderDetails);

module.exports = router;