
const sql = require('../db/customer_orderSQL');

module.exports = {

    fetchOrderDataById: async (req, res) => {
    
        try {
            let id = req.params.customer_id;
            console.log("id: ", id);
            
            console.log("First get all orders by customer id...");
            let orders = await sql.getOrdersByCustomerId(id);

            console.log("Put order id:s to a list...");
            let orderIdList = orders.map(o => o.id)
            console.log("order id list: ", orderIdList);
            
            console.log("Get all Order Details...");
            let order_details = await sql.getOrderItemsByOrderId(orderIdList);

            res.status = 200;
            res.json({ status: "OK", orders : orders, order_details : order_details  });
            }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    createNewOrder: async (req, res) => {

        console.log("Started to create new order ...");
        //form of data
        //{order: o, orderDetails: []}

        let {order, order_details} = req.body

        console.log("Check if order details are included to order...");
        console.log("Every order must have at least on order detail");
        
        if (order_details.length == 0) {
            return res.status(400).json({
                status : "NOT OK", 
                message : "Order is not added, must have at least one order detail"
            });
        }

        try {
            console.log("req.body:");
            console.log("order: ",order);
            console.log("order_details: ",order_details);

            //this creates new order and returns the id of new order 
            let t = await sql.createNewOrder(order);
            let orderId = t.insertId
            console.log("...new order is created...");
            console.log("orderId: ",orderId)

            console.log("Started to insert orderdetails ...");
            console.log("Start building params list...");
            
            let params = [];
            params = order_details.map(o => [
                    orderId,
                    o.product_id,
                    o.quantity,
                    o.unit,
                    o.note,
                    o.tax_percentage,
                    o.delivered,
                    o.unit_price
                ]);

            let result = await sql.createNewOrderDetail([params]);
            console.log("Order details inserted succesfully: ", result)

            return res.status(201).json({ 
                status: 201, 
                order_id: orderId, 
                order_details: result 
            });
            }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({status : "NOT OK", msg : "Order was not added"});
        }
    },
    updateOrderDetails: async (req, res) => {

        try {
            let order_id = req.params.order_id;
            let newOrderDetails = req.body;

            console.log("order id: ", order_id );
            console.log("order details: ", newOrderDetails);

            console.log("Fetch the id:s of the removable rows...");
            
            let ids = await sql.getOrderDetailIdsByOrder(order_id);
            console.log("id:s to be removed:");
            console.log(ids);
            
            console.log("Start removing order details from order " + order_id + "...");
            
            let result = await sql.deleteDetailsFromOrder(order_id);
            console.log("Order details from order " + order_id + "removed succesfully");
            console.log("result: ", result);


            console.log("Start adding new order details...");
            console.log("Start building params list...");
            
            let params = []
            params = newOrderDetails.map(o => [
                order_id,
                o.product_id,
                o.quantity,
                o.unit,
                o.note,
                o.tax_percentage,
                o.delivered,
                o.unit_price
                ]);
            
            console.log("Adding the id:s of removed order details to params list...");
            for (let i = 0; i < ids.length; i++) {
                    params[i].unshift(ids[i].id)
            }
            console.log("params: ", params);
            
            console.log("Start insertng new order details to database...");
            
            let result_for_details = await sql.updateOrderDetails([params]);

            console.log("New order details inserted succesfully...", result_for_details)

           return res.status(204).json({ 
                status: 204, 
                orderDetails : result, 
                orderDetailsUpdate : result_for_details  });
            }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },

}