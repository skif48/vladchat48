const AppError = require('../../AppError');
class UserAlreadyExistsError extends AppError {
  constructor(message) {
    super(message || 'User already exists');
  }
}

module.exports = UserAlreadyExistsError;
