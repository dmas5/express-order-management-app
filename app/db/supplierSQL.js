
const { executeSQL } = require( '../services/sql')

module.exports = {

    getSuppliers: () => {
        let sql = "SELECT * FROM suppliers"
        return executeSQL(sql,[]);
    },
    removeSupplier: (supplierId) => {
        let sql = "DELETE FROM suppliers WHERE id = ?"
        return executeSQL(sql,[supplierId]);
    },
    createNewSupplier: (newSupplier) => {
        let params = []
        params.push(newSupplier.company_name);
        params.push(newSupplier.contact_name);
        params.push(newSupplier.contact_title);
        params.push(newSupplier.street_address);
        params.push(newSupplier.postal_code);
        params.push(newSupplier.city);
        params.push(newSupplier.phone);
        params.push(newSupplier.email);

        let sql = 
        `INSERT INTO suppliers
        (company_name,contact_name,contact_title,street_address,
        postal_code,city,phone,email)
        VALUES (?,?,?,?,?,?,?,?)`

        return executeSQL(sql,params);
    },
    modifySupplier: (newSupplier,id) => {
        let params = []
        params.push(id)
        params.push(newSupplier.company_name);
        params.push(newSupplier.contact_name);
        params.push(newSupplier.contact_title);
        params.push(newSupplier.street_address);
        params.push(newSupplier.postal_code);
        params.push(newSupplier.city);
        params.push(newSupplier.phone);
        params.push(newSupplier.email);

        let sql = 
        `INSERT INTO suppliers
        (id,company_name,contact_name,contact_title,street_address,
        postal_code,city,phone,email)
        VALUES (?,?,?,?,?,?,?,?,?)`

        return executeSQL(sql,params);
    },
}