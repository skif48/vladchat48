const UserService = require('../../../../service/UserService/user.service');

class UserServiceStub extends UserService {
  constructor(userRepository) {
    super(userRepository);
  }

  async getUserById(id) {
    return await this.userRepository.findById(id)
  }

  async createUser(userData) {
  }

  async updateNickname(userId, newNickname) {
  }
}

module.exports = UserServiceStub;
