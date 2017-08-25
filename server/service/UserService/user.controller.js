"use strict";
const UserServiceClass = require('./user.service');
const User = require('../../db/models/User.model').User;
const UserService = new UserServiceClass(User);

async function getUserById(req, res) {
  const userId = req.params.userId;
  try {
    const user = await UserService.getUserById(userId);
    if(user !== null){
      res.json(user);
    }
  } catch(err) {
    res.sendStatus(500);
  }
}

async function createUser(req, res) {
  const userData = {
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
    role: 'user'
  };

  try {
    const user = await UserService.createUser(userData);
    res.json(user);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  getUserById,
  createUser
};
