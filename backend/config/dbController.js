const connection = require('./db');

async function getData(tableName, conditions = {}) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM \`${tableName}\``;
        const values = [];

        if (Object.keys(conditions).length > 0) {
            const whereClauses = Object.keys(conditions).map(key => {
                values.push(conditions[key]);
                return `\`${key}\` = ?`;
            }).join(" AND ");
            sql += ` WHERE ${whereClauses}`;
        }

        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error("Error in getData:", err);
                return resolve([{ error: "Error fetching data" }]);
            }
            resolve(results);
        });
    });
}

async function postData(tableName, data) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO \`${tableName}\` SET ?`;
        connection.query(sql, data, (err, result) => {
            if (err) {
                console.error("Error in postData:", err);
                return resolve({ response: "Error in sending data" });
            }
            resolve({ response: "Data added successfully", insertId: result.insertId });
        });
    });
}

module.exports = {
    getData,
    postData
};
