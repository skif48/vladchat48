"use strict";

const sinon = require('sinon');
const UserRepository = require('../../../../service/UserService/user.repository');
const UserRepositoryStub = sinon.createStubInstance(UserRepository);

UserRepositoryStub.userDAO = new Map();

UserRepositoryStub.getUserDAO = () => this.userDAO;

UserRepositoryStub.setUserDAO = userDAO => this.userDAO = userDAO;

UserRepositoryStub.findUserById = id => Promise.resolve(this.userDAO.get(id) || null);

UserRepositoryStub.findByNickname = nickname => {
  for(let user of this.userDAO.values()) {
    if(user.nickname === nickname) {
      return Promise.resolve(user);
    }
  }
  return null;
};

UserRepositoryStub.findByEmail = email => {
  for(let user of this.userDAO.values()) {
    if(user.email === email) {
      return Promise.resolve(user);
    }
  }
  return null;
};

UserRepositoryStub.findByNicknameOrEmail = (nickname, email) => {
  for(let user of this.userDAO.values()) {
    if(user.nickname === nickname || user.email === email) {
      return Promise.resolve(user);
    }
  }
  return null;
};

UserRepositoryStub.create = userData => {
  userData.id = this.userDAO.size + 1;
  this.userDAO.set(userData.id, userData);
  return Promise.resolve(userData);
};

console.log(UserRepositoryStub);
