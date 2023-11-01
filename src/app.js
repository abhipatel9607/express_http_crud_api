const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");

const todosRouter = require('./routes/todos');
const createTodosTable = require('./db/todos')

createTodosTable()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', todosRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});