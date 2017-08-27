const AppError = require('../../AppError');
class EmailIsTakenError extends AppError {
  constructor(message) {
    super(message || 'Specified email is already taken');
  }
}

module.exports = EmailIsTakenError;
