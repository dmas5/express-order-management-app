
const sql = require('../db/productSQL');

module.exports = {

    fetchProductById: async (req, res) => {

        console.log("fetching product by id...");
        try {
            let id = req.params.id;

            let products = [];
            products = await sql.getProductById(id);
                
            res.status = 200;
            res.json(products);

            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    fetchProductsByCategory: async (req, res) => {

        console.log("fetching product by category...");
        try {
            let category_name = req.query.name;

            let products = [];
            products = await sql.getProductsByCategory(category_name);
                
            res.status = 200;
            res.json(products);

            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    fetchAllProducts: async (req, res) => {

        console.log("fetching products...");
        try {
            let products = await sql.getAllProducts();
            res.status = 200;
            res.json(products);
            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    createNewProduct: async (req, res) => {

        console.log("creating new product...");
        let product = req.body
        console.log(product);
        
        try {
            console.log("calling the db layer...");
            let result = await sql.createNewProduct(product);
            console.log("new product added succesfully to the database");
            console.log(result);
            
            res.status = 200;
            res.json({
                status: 200,
                new_product_id: result.insertId,
                result_set_header: result,
                new_product: {id:result.insertId,...product}
            });
            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },

}