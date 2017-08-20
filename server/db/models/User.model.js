"use strict";

const sequelize = require('../index').sequelize;
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = {
  User
};
