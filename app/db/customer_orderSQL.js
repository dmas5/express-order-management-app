var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results);
        });
    })
}

const getOrderItems = (orderIdList) => {
    
    return new Promise((resolve, reject) => {

        let orderId = "('" + orderIdList.join("','") + "')";

        let query =
        `SELECT 
            order_details.*,
            (quantity*unit_price) AS total_price_without_tax,
            (quantity*unit_price*(1.0 + tax_percentage / 100.0)) AS total_price
        FROM order_details
        WHERE order_id IN`
        query = query + orderId
        query = query + " ORDER BY order_details.id ASC"
        connection.query(query, [], function (error, result, fields) {

            if (error) {
                console.log("error", error);
                reject(error);
            }
            else {
                console.log("result", result);
                resolve(result);
            }
        });
    })

}


module.exports = {

    deleteDetailsFromOrder: (id) => {
        let sql = "DELETE FROM order_details WHERE order_id = ?"
        return executeSQL(sql,[id]);
    },
    createNewOrder: (order) => {
        let params = []
        params.push(order.order_number)
        params.push(order.order_date.replace("T", " ").replace(".000Z", ""))
        params.push(order.delivery_date.replace("T", " ").replace(".000Z", ""))
        params.push(order.customer_id)
        let sql = "INSERT INTO orders (order_number, order_date, delivery_date, customer_id) VALUES (?, ?, ?, ?)"
        return executeSQL(sql, params);
    },
    getOrdersByCustomerId: (id) => {
        let sql =
        `SELECT orders.*,
        SUM(order_details.quantity * order_details.unit_price) AS total_price_without_tax,
        SUM(order_details.quantity * order_details.unit_price * (1.0 + order_details.tax_percentage / 100.0)) AS total_price
        FROM orders JOIN 
        order_details ON orders.id = order_details.order_id
        AND orders.customer_id = ?
        GROUP BY orders.id`
        return executeSQL(sql, [id]);
    },
    getAllCustomersWithOrderData: (all) => {
        let sql =
       `SELECT
       c.*,
       COUNT(helpertable.id) AS order_count,
       SUM(helpertable.total_price) AS order_total,
       SUM(helpertable.taxed_price) AS order_total_with_tax
       FROM customers AS c
       JOIN
       (SELECT o.id,
       o.order_number,
       o.customer_id,
       SUM(od.quantity*od.unit_price) AS total_price,
       SUM(od.quantity*od.unit_price*(1.0 + od.tax_percentage / 100.0)) AS taxed_price
       FROM orders AS o
       JOIN
       order_details AS od ON o.id = od.order_id
       GROUP BY o.id) AS helpertable
       ON c.id = helpertable.customer_id`
       if (all === '1') sql = sql + " WHERE c.status = 0 GROUP BY c.id"
       if (all === '0') sql = sql + " GROUP BY c.id"

        return executeSQL(sql,[all]);
    },
    getOrderItemsByOrderId: (orderIdList) => {
        return getOrderItems(orderIdList);
    },
    createNewOrderDetail :(params) => {
        let query =
        `INSERT INTO order_details
        (order_id, product_id, quantity, unit, note, tax_percentage, delivered, unit_price)
        VALUES ?`
        return executeSQL(query,params)
    },
    getOrderDetailsByCustomer: (id) => {
            let query =
            `SELECT
                id,
                order_id,
                product_id,
                quantity,
                unit,
                note,
                unit_price,
                tax_percentage,
                delivered,
                (quantity * unit_price) AS total_price_excl_tax,
                (quantity * unit_price * (1.0 + tax_percentage / 100.0)) AS total_price
            FROM order_details
            WHERE order_id IN (
                SELECT id
                FROM orders
                WHERE customer_id = ?
            )`
        return executeSQL(query,[id])
    },
    deleteAllOrderDetails: (id) => {
        let query =
        `DELETE FROM order_details
        WHERE order_id IN (
            SELECT id
            FROM orders
            WHERE customer_id = ?
        )`
        return executeSQL(query,[id])
    },
    deleteAllOrders: (id) => {
        let query = "DELETE FROM orders WHERE customer_id = ?"
        return executeSQL(query,[id])
    },
    deleteCustomer: (id) => {
        let query = "DELETE FROM customers WHERE id = ?"
        return executeSQL(query,[id])
    },
    updateOrderDetails :(params) => {
        let query =
        `INSERT INTO order_details
        (id, order_id, product_id, quantity, unit, note, tax_percentage, delivered, unit_price)
        VALUES ?`
        return executeSQL(query,params)

    },
    getOrderDetailIdsByOrder: (orderid) => {
        let sql = "SELECT id FROM order_details WHERE order_id = ?"
        return executeSQL(sql, [orderid]);
    },

}