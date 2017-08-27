const AppError = require('../AppError');
class EntityNotFoundError extends AppError {
  constructor(message) {
    super(message || 'Entity not found');
  }
}

module.exports = EntityNotFoundError;
