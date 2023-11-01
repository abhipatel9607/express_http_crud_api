const client = require('./database');


async function createTodosTable() {
    try {
        await client.connect();
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS todos (
                id serial PRIMARY KEY,
                text varchar(255),
                isCompleted boolean
            )
        `;
        await client.query(createTableQuery);
        console.log("Table 'todos' created.");
    } catch (err) {
        console.error("Error creating the 'todos' table:", err);
    }
}

module.exports = createTodosTable;