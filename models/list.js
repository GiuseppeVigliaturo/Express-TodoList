'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  List.init({
     id: {
        allowNull: false,
        type: Sequelize.BIGINT(12)
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      userId: {
        type: Sequelize.BIGINT(12),
         allowNull: false
      }
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};