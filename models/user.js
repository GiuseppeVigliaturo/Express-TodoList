'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      //se non metto autoincrement mi da errore se vado ad aggiungere un utente/lista/todo
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    password:{type: DataTypes.STRING, allowNull: false}
  }, {});
  User.associate = function(models) {
    User.hasMany(models.List);
  };
  return User;
};