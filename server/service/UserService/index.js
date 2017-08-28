const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/nickname/:userId', userController.updateNickName);

module.exports = {
  router
};
