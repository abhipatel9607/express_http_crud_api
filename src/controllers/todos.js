const client = require('../db/database');

async function createTodo(req, res) {
    try {
        const data = req.body;
        const result = await client.query('INSERT INTO todos (isCompleted, text) VALUES ($1, $2) RETURNING *', [data.isCompleted, data.text]);
        const insertedTodo = result.rows[0];
        res.status(201).json({
            message: "Todo created successfully",
            todo: insertedTodo
        });
    } catch (err) {
        res.status(500).json({
            status: "500 Internal Server Error",
            message: "Error creating a new TODO",
            error: err.message
        });
    }
}

async function getTodos(req, res) {
    try {
        const query = 'SELECT id, text, isCompleted FROM todos';
        const result = await client.query(query);
        const todos = result.rows;
        res.status(200).json({ todos });
    } catch (err) {
        res.status(500).json({
            status: "500 Internal Server Error",
            message: "Error retrieving TODOs",
            error: err.message
        });
    }
}

async function getTodo(req, res) {
    try {
        const id = req.params.id;
        const result = await client.query('SELECT id, text, isCompleted FROM todos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "TODO not found" });
        }

        const todo = result.rows[0];
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({
            status: "500 Internal Server Error",
            message: "Error retrieving a TODO",
            error: err.message
        });
    }
}

async function updateTodo(req, res) {
    try {
        const id = req.params.id;
        const { text, isCompleted } = req.body;
        const updateQuery = `
            UPDATE todos
            SET text = $1, isCompleted = $2
            WHERE id = $3
        `;
        const result = await client.query(updateQuery, [text, isCompleted, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "TODO not found" });
        } else {
            const updatedTodo = await client.query('SELECT * FROM todos WHERE id = $1', [id]);
            res.status(200).json({
                message: "Todo updated successfully",
                todo: updatedTodo.rows[0]
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "500 Internal Server Error",
            message: "Error updating a TODO",
            error: err.message
        });
    }
}

async function deleteTodo(req, res) {
    try {
        const id = req.params.id;
        const result = await client.query('DELETE FROM todos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "TODO not found" });
        } else {
            res.status(200).json({ message: "TODO " + id + " deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({
            status: "500 Internal Server Error",
            message: "Error deleting a TODO",
            error: err.message
        });
    }
}

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
};