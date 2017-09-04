'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;

const EntityNotFoundError = require('../../../../errors/entityErrors/EntityNotFoundError');
const UserAlreadyExistsError = require('../../../../errors/entityErrors/user/UserAlreadyExistsError');

const userRepositoryStub = require('./user.repository.stub');
const UserService = require('../../../../service/UserService/user.service');

const users = [
  {
    dataValues: {
      id: 1,
      email: 'user1@email.com',
      nickname: 'user1',
      password: 'user1',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  {
    dataValues: {
      id: 2,
      email: 'user2@email.com',
      nickname: 'user2',
      password: 'user2',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
];
const userDAOStub = new Map();
users.forEach(user => {
  userDAOStub.set(user.dataValues.id, user)
});
userRepositoryStub.setUserDAO(userDAOStub);
const userService = new UserService(userRepositoryStub);

describe('User service unit tests', () => {
  beforeEach(done => {
    users.forEach(user => {
      userDAOStub.set(user.dataValues.id, user)
    });
    userRepositoryStub.setUserDAO(userDAOStub);
    done();
  });

  it('getUserById should return existing user without password and meta dates', async () => {
    const id = 1;
    const user = await userService.getUserById(id);
    expect(user).to.be.equal(users[0].dataValues);
    expect(user.password).to.be.undefined;
    expect(user.createdAt).to.be.undefined;
    expect(user.updatedAt).to.be.undefined;
  });

  it('getUserById should throw EntityNotFound if user not found', async () => {
    const id = 0;
    try {
      await userService.getUserById(id);
    } catch (err) {
      const isEntityNotFoundError = err instanceof EntityNotFoundError;
      assert.equal(isEntityNotFoundError, true);
    }
  });

  it('createUser should successfully create user', async () => {
    const userData = {
      email: 'user3@email.com',
      nickname: 'user3',
      password: 'user3',
      role: 'user'
    };

    const user = await userService.createUser(userData);

    delete userData.password;

    expect(user).to.be.equal(userData);
  });

  it('createUser should throw UserAlreadyExistsError for existing email/nickname', async () => {
    const userData = {
      email: 'user1@email.com',
      nickname: 'user1',
      password: 'user1',
      role: 'user'
    };

    try {
      await userService.createUser(userData);
    } catch (err) {
      const isUserAlreadyExistsError = err instanceof UserAlreadyExistsError;
      assert.equal(isUserAlreadyExistsError, true);
    }
  });

  it('updateNickName should successfully update nickname for new nickname', async () => {
    const userId = 1;
    const newNickName = 'newUser1';

    const user = await userService.updateNickname(userId, newNickName);

    expect(user.id).to.be.equal(userId);
    expect(user.nickname).to.be.equal(newNickName);
    expect(user.role).to.be.equal(role);

    expect(user.password).to.be.undefined;
    expect(user.createdAt).to.be.undefined;
    expect(user.updatedAt).to.be.undefined;
  });

  it('updateNickName should throw an error if provided user id is not valid', async () => {
    const invalidUserId = 'id';


  });
});
