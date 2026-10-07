
const { executeSQL } = require( '../services/sql')

module.exports = {

    getProductById: (id) => {
        let sql = "SELECT * FROM products WHERE id = ?"
        return executeSQL(sql,[id]);
    },
    getProductsByCategory: (category_name) => {
        let sql =
        `SELECT * FROM products WHERE category_id =
            (SELECT
            id
            FROM categories 
            WHERE category_name = ?)`
        return executeSQL(sql,[category_name]);
    },
    getAllProducts: () => {
        let sql = "SELECT * FROM products"
        return executeSQL(sql,[]);
    },
    createNewProduct: (product) => {
        let params = []
        params.push(product.product_name)
        params.push(product.category_id)
        params.push(product.supplier_id)
        params.push(product.unit_price)
        params.push(product.units_in_stock)
        params.push(product.description)
        
        let sql = 
        `INSERT INTO products (
            product_name,
            category_id,
            supplier_id,
            unit_price,
            units_in_stock,
            description
        ) VALUES (?, ?, ?, ?, ?, ?)`

        console.log(sql);
        console.log(params);
        
        return executeSQL(sql,params);
    },
}