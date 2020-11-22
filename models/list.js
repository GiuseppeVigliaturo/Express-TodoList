'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT(12),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.BIGINT(12),
      allowNull: false

  }
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.User,{through: 'List', foreignKey: 'userId'}
    );
  };
  return List;
};