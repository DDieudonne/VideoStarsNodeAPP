const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost', // our serveur
    user: 'root', // its username of database or server
    password: "Dtoxpopnbrother95170", // its database password
    database: 'videostars'    //its name of database on mysql
});

module.exports = connection;