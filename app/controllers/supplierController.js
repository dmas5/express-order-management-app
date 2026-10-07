
const sql = require('../db/supplierSQL');

module.exports = {

    fetchAllSuppliers: async (req, res) => {

        console.log("fetching suppliers...");
        try {

            let suppliers = [];
            suppliers = await sql.getSuppliers();
                
            res.status = 200;
            res.json(suppliers);

            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    
    addNewSupplier: async (req, res) => {

        console.log("creating new supplier...");
        let newSupplier = req.body;

        console.log("new supplier object:");
        console.log(newSupplier);
        
        try {

            let result = await sql.createNewSupplier(newSupplier)
            console.log("new supplier added to database");
                 
            res.status = 200;
            res.json({status : "OK", result : result});

            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    modifySupplier: async (req, res) => {

        console.log("starting to modify supplier...");
        let supplierId = req.params.id;
        let editedSupplier = req.body;

        console.log("supplier id:");
        console.log(supplierId);
        console.log("edited supplier:");
        console.log(editedSupplier);
        
        try {

            let result = await sql.removeSupplier(supplierId)
            console.log("supplier ", supplierId, " removed succesfully");

            let edited = await sql.modifySupplier(editedSupplier,supplierId)
            console.log("supplier ", supplierId, " was modified succesfully");
            
                 
            res.status = 200;
            res.json({status : "OK", edited : edited});

            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },
    removeSupplier: async (req, res) => {

        console.log("starting to remove supplier...");
        let supplierId = req.params.id;
        try {
            let result = await sql.removeSupplier(supplierId);
            console.log("supplier ", supplierId, " was removed succesfully");
            res.status = 200;
            res.json(result);

            }
        catch (err) {
            console.log("Error in server")
            console.log(err);
            
            res.status = 400;
            res.json({status : "NOT OK", msg : err});
        }
    },

}