
const sql = require('../db/customer_orderSQL');

module.exports = {

    fetchAllCustomerData: async (req, res) => {

        console.log("fetchAllCustomerRows started ...");
        // all=1 only active 
        // all = 0 = all
        try {
            let query_data = req.query.all;
            let all = ""
            if (query_data === '1') all = '1'
            if (query_data === '0') all = '0'

            
            let c = [];
            c = await sql.getAllCustomersWithOrderData(all);
                
            res.status = 200;
            res.json(c);

            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    removeCustomer: async (req, res) => {
            console.log("Customer removal started ...");
            let msg_message = ""
            let delivered_rows = []
        try {
            let id = req.params.id;
            // console.log("First, find the customer's orders");
            // console.log("Then, list all order details");
            // console.log("Customer can be deleted if all order details have delivered = 0");
            // console.log("0 = not delivered");
            // console.log("1 = delivered");
            // console.log("...");
            console.log("Fetching all order details by customer...");
            let details = await sql.getOrderDetailsByCustomer(id);

            console.log("order_details: ",details)
            //finds out if details include delivered order details

            let delivered_values_list = details.map(o => o.delivered ? 1 : o.delivered)
            if (delivered_values_list.includes(1)){
                //filters delivered rows to be shown in e message
                delivered_rows = details.filter(o => o.delivered)
                msg_message = "Could not remove customer, it has at least one delivered order detail"
                return res.status(400).json({
                status : 400, 
                message : "Could not remove customer, it has at least one delivered order detail",
                order_details : delivered_rows 
                })
                
            }
            console.log("Starting to remove customers...");
            console.log("Removing all order details...");
            let detail_rows = await sql.deleteAllOrderDetails(id);
            console.log("All detail rows removed: ", detail_rows);

            console.log("Removing all orders...");
            let order_rows = await sql.deleteAllOrders(id);
            console.log("All orders removed: ", order_rows);

            console.log("Starting to remove customer...");
            let customer_rows = await sql.deleteCustomer(id);
            console.log("Customer removed: ", customer_rows);
            
        return res.status(204).json({ 
                status: "OK", 
                details : detail_rows, 
                orders: order_rows, 
                customer: customer_rows  });
        }
        catch (err) {
            console.log("Error in server")
            console.log("msg-message: ", msg_message);
            if (msg_message){
               return res.json({status : 400, message : msg_message, order_details: delivered_rows}); 
            }
            return res.json({status : 400, message : err});
        }
    },

}