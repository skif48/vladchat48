"use strict";

class UserRepository {
  constructor(UserDAO) {
    this.userDAO = UserDAO;
  }

  getUserDAO() {
    return this.userDAO;
  }

  setUserDAO(userDAO) {
    this.userDAO = userDAO;
  }

  findUserById(id) {
    return this.userDAO.findById(id);
  }

  findByNickname(nickname) {
    return this.userDAO.findOne({where: {nickname}});
  }

  findByEmail(email) {
    return this.userDAO.find({where: {email}});
  }

  findByNicknameOrEmail(nickname, email) {
    return this.userDAO.find({where: {$or: [{nickname}, {email}]}});
  }

  create(userData) {
    return this.userDAO.create(userData);
  }
}

module.exports = UserRepository;
