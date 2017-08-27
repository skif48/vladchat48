"use strict";
const UserServiceClass = require('./user.service');
const User = require('../../db/models/User.model').User;
const NicknameIsTakenError = require('../../errors/entityErrors/user/NicknameIsTakenError');
const EmailIsTakenError = require('../../errors/entityErrors/user/EmailIsTakenError');
const EntityNotFoundError = require('../../errors/entityErrors/EntityNotFoundError');
const ValidationError = require('sequelize/lib/errors/').ValidationError;
const UserAlreadyExistsError = require('../../errors/entityErrors/user/UserAlreadyExistsError');

const UserService = new UserServiceClass(User);

async function getUserById(req, res) {
  const userId = req.params.userId;
  try {
    const user = await UserService.getUserById(userId);
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
    const user = await UserService.createUser(userData);
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
    const newUser = await UserService.updateNickname(userId, newNickname);
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
