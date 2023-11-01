const express = require('express');
const router = express.Router();

const {
    todoBodySchema,
    idSchema,
    getValidate,
    getValidateId,
} = require('../validator/validators');
const { createTodo, getTodos, getTodo, updateTodo, deleteTodo } = require('../controllers/todos');

router.post('/todos', getValidate(todoBodySchema), createTodo);
router.get('/todos', getTodos);
router.get('/todos/:id', getValidateId(idSchema), getTodo);
router.put('/todos/:id', getValidateId(idSchema), getValidate(todoBodySchema), updateTodo);
router.delete('/todos/:id', getValidateId(idSchema), deleteTodo);

module.exports = router;