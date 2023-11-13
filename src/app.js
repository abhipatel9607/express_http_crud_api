const { connection } = require("./db/database.js");
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");

const todosRouter = require('./routes/todos.js');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', todosRouter);


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Handle Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            status: '400 Bad Request',
            message: 'Validation error',
            errors: err.errors.map(error => ({
                field: error.path,
                message: error.message,
            })),
        });
    }

    // Handle other errors
    res.status(500).json({
        status: '500 Internal Server Error',
        message: 'Something went wrong',
        error: err.message,
    });
});

connection()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});