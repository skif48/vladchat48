const express = require('express');
const router = express.Router();
const example = require('./example.controller');

router.get('/', example.getSomething);

module.exports = {
  router
};
