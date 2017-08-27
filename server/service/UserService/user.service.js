const _ = require('lodash');
const NicknameIsTakenError = require('../../errors/entityErrors/user/NicknameIsTakenError');
const EmailIsTakenError = require('../../errors/entityErrors/user/EmailIsTakenError');
const EntityNotFoundError = require('../../errors/entityErrors/EntityNotFoundError');
const UserAlreadyExistsError = require('../../errors/entityErrors/user/UserAlreadyExistsError');

class ExampleService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id).then(user => user.dataValues);
    if(user === null) {
      throw new EntityNotFoundError();
    }
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }

  async createUser(userData) {
    await this.userRepository.find({where: {$or: [{nickname: userData.nickname}, {email: userData.email}]}})
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

    const me = await this.userRepository.findById(userId);

    if(me === null) {
      throw new EntityNotFoundError();
    }

    await this.userRepository.findOne({where: {nickname : newNickname}})
      .then(user => {
        if(user !== null) {
          throw new NicknameIsTakenError();
        }
      });

    me.setDataValue('nickname', newNickname);
    await me.save();

    return {
      email: me.dataValues.email,
      nickname: me.dataValues.nickname,
      role: me.dataValues.role
    };
  }
}

module.exports = ExampleService;
