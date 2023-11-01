const yup = require('yup');

const todoBodySchema = yup.object().shape({
    isCompleted: yup.boolean().required(),
    text: yup.string().required(),
});

const idSchema = yup.object().shape({
    id: yup.number().positive().integer().required()
});

function getValidate(schema) {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body);
            console.log("validate successful");
            next();
        } catch (err) {
            res.status(400).json({
                status: "Bad request - Status code: 400",
                message: err.message
            });
        }
    };
}

function getValidateId(schema) {
    return async (req, res, next) => {
        try {
            await schema.validate({ id: req.params.id });
            next();
        } catch (err) {
            res.status(400).json({
                status: "Bad request - Status code: 400",
                message: err.message
            });
        }
    };
}

module.exports = {
    todoBodySchema,
    idSchema,
    getValidate,
    getValidateId,
};