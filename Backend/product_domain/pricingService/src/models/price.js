const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Price = sequelize.define('Price', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount_type: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  valid_until: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'prices',
  timestamps: false
});

module.exports = Price;
