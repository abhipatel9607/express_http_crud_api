const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const TODOS = sequelize.define("myTodo", {
    text: DataTypes.TEXT,
    isCompleted: DataTypes.BOOLEAN
});

(async () => {
    await sequelize.sync({ force: true });
})();

module.exports = { TODOS };
