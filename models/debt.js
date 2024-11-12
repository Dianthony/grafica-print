'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Debt.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    value: DataTypes.FLOAT,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Debt',
  });
  return Debt;
};