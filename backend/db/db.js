const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'website',
    password: '1453',
    database: 'chat_app',
    multipleStatements: true
})

connection.connect(function(err){
    if (err) throw err;
    console.log('connection successful')
})

module.exports = connection