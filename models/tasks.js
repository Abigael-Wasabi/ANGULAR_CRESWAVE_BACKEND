const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tasks = sequelize.define('Tasks', {
  taskID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { 
    type: DataTypes.STRING, 
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false, 
    defaultValue: 'incomplete',
    validate: {
      isIn: [['completed', 'incomplete']],
    },
  },
});

module.exports = Tasks;