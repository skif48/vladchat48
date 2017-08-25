const express = require('express');
const router = express.Router();
const user = require('./user.controller');

router.get('/:userId', user.getUserById);
router.post('/', user.createUser);

module.exports = {
  router
};
