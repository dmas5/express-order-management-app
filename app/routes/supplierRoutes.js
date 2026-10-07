var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/supplierController');

//returns all suppliers
router.route('/api/supplier').
    get(ctrl.fetchAllSuppliers);

//adds new supplier
router.route('/api/supplier').
    post(ctrl.addNewSupplier);

//modifies supplier
router.route('/api/supplier/:id').
    put(ctrl.modifySupplier);

//removes supplier
router.route('/api/supplier/:id').
    delete(ctrl.removeSupplier);
    

module.exports = router;