const express = require('express');
const router = express.Router();
const { TODOS } = require('../db/todos')
const {
    todoBodySchema,
    idSchema,
    getValidate,
    getValidateId,
} = require('../validator/validators');



// Create Todo
router.post('/todos', getValidate(todoBodySchema), async (req, res) => {
    const { text, isCompleted } = req.body;
    const createdTodo = await TODOS.create({ text: text, isCompleted: isCompleted });
    res.status(200).send(createdTodo);
})

// Get all Todo
router.get('/todos', async (req, res) => {
    const users = await TODOS.findAll();
    res.status(200).send(users)
})

// Get specific todo by ID
router.get('/todos/:id', getValidateId(idSchema), async (req, res) => {
    const todoId = req.params.id;
    const todo = await TODOS.findByPk(todoId);
    console.log("Hey i m there", todo);
    if (!todo) {
        return res.status(404).send("404 Not Found");
    }
    res.status(200).json(todo);
});

// Update Todo
router.put('/todos/:id', getValidateId(idSchema), getValidate(todoBodySchema), async (req, res) => {
    const todoId = req.params.id;
    const { text, isCompleted } = req.body;
    const todo = await TODOS.findByPk(todoId);
    if (!todo) {
        return res.status(404).send("404 Not Found");
    }
    await todo.update({
        text: text,
        isCompleted: isCompleted,
    });
    res.status(200).json(todo);
});

// Delete todo
router.delete('/todos/:id', getValidateId(idSchema), async (req, res) => {
    const todoId = req.params.id;
    const todo = await TODOS.findByPk(todoId);
    if (!todo) {
        return res.status(404).send("404 Not Found");
    }
    await todo.destroy();
    res.status(200).send("Todo deleted")
});

module.exports = router;