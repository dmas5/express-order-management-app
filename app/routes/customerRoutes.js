var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/customerController');

//returns all cusomer rows
//including all orders count(*) the customer have
//including total sum of order details
//including total sum of order details with taxes
router.route('/api/customer').
    get(ctrl.fetchAllCustomerData);
    
//removes a customer
//remove not allowed if customer has any order
//details with state status delivered
router.route('/api/customer/:id').
    delete(ctrl.removeCustomer);

module.exports = router;