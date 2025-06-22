const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// ✅ SRP - Single Responsibility Principle
// This model defines only the structure and configuration of the "Price" entity

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

// ✅ KISS - Keep It Simple, Stupid
// The model is clean, minimal, and easy to maintain without unnecessary complexity

module.exports = Price;
