const _ = require('lodash');
const NicknameIsTakenError = require('../../errors/entityErrors/user/NicknameIsTakenError');
const EmailIsTakenError = require('../../errors/entityErrors/user/EmailIsTakenError');
const EntityNotFoundError = require('../../errors/entityErrors/EntityNotFoundError');
const UserAlreadyExistsError = require('../../errors/entityErrors/user/UserAlreadyExistsError');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this.userRepository.findUserById(id).then(user => user.dataValues);
    if(user === null) {
      throw new EntityNotFoundError();
    }
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }

  async createUser(userData) {
    await this.userRepository.findByNicknameOrEmail(userData.nickname, userData.email)
      .then(user => {
        if(user !== null) {
          throw new UserAlreadyExistsError();
        }
      });

    const user = await this.userRepository.create(userData).then(user => user.dataValues);
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }

  async updateNickname(userId, newNickname) {
    if(!_.isInteger(userId)) {
      throw new Error('userId must be integer');
    }

    if(newNickname === '' && newNickname.length < 4) {
      throw new Error('nickname must be at least 4 characters');
    }

    await this.userRepository.findByNickname(newNickname)
      .then(user => {
        if(user !== null) {
          throw new NicknameIsTakenError();
        }
      });

    let me = await this.userRepository.findUserById(userId);

    if(me === null) {
      throw new EntityNotFoundError();
    }

    me = await this.userRepository.update(me, {nickname: newNickname});

    return {
      email: me.dataValues.email,
      nickname: me.dataValues.nickname,
      role: me.dataValues.role
    };
  }
}

module.exports = UserService;
