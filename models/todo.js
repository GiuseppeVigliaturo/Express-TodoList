'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    id: {
        allowNull: false,
        type: Sequelize.BIGINT(12)
      },
      todo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      listId: {
        type: Sequelize.BIGINT(12),
         allowNull: false
      },
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};