const ValidationError = require("sequelize/lib/errors/index").ValidationError;
const EmptyResultError = require("sequelize/lib/errors/index").EmptyResultError;

class ExampleService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.findById(id, {rejectOnEmpty: true}).then(user => user.dataValues);
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    } catch (err) {
      if(err instanceof EmptyResultError) {
        return {};
      } else {
        throw err;
      }
    }
  }

  async createUser(userData) {
    try {
      const user = await this.userRepository.create(userData).then(user => user.dataValues);
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    } catch (err) {
      if(err instanceof ValidationError) {
        console.log('validation err');
        console.log(err);
      }
      console.log(err);
    }
  }
}

module.exports = ExampleService;
