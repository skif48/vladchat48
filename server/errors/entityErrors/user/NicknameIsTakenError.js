const AppError = require('../../AppError');
class NicknameIsTakenError extends AppError {
  constructor(message) {
    super(message || 'Specified nickname is already taken');
  }
}

module.exports = NicknameIsTakenError;
