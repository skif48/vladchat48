"use strict";
const UserService = require('./user.service');
const UserRepository = require('./user.repository');
const User = require('../../db/models/User.model').User;
const NicknameIsTakenError = require('../../errors/entityErrors/user/NicknameIsTakenError');
const EmailIsTakenError = require('../../errors/entityErrors/user/EmailIsTakenError');
const EntityNotFoundError = require('../../errors/entityErrors/EntityNotFoundError');
const ValidationError = require('sequelize/lib/errors/').ValidationError;
const UserAlreadyExistsError = require('../../errors/entityErrors/user/UserAlreadyExistsError');

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

async function getUserById(req, res) {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch(err) {
    if(err instanceof EntityNotFoundError) {
      res.sendStatus(404);
      return;
    }
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
    const user = await userService.createUser(userData);
    res.json(user);
  } catch(err) {
    if(err instanceof ValidationError) {
      res.sendStatus(400);
      return;
    }

    if(err instanceof UserAlreadyExistsError) {
      res.sendStatus(422);
      return;
    }

    res.sendStatus(500);
  }
}

async function updateNickName(req, res) {
  const newNickname = req.body.newNickname;
  const userId = req.body.userId;

  try {
    const newUser = await userService.updateNickname(userId, newNickname);
    res.json(newUser);
  } catch (err) {
    if(err instanceof NicknameIsTakenError) {
      res.sendStatus(422);
      return;
    }

    if(err instanceof EntityNotFoundError) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(500);
  }
}

module.exports = {
  getUserById,
  createUser,
  updateNickName
};
