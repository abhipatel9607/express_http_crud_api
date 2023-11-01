const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "todo_crud_api",
});

module.exports = client;