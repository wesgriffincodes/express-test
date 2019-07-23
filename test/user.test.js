require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/model/userSchema');

describe('user routes', () => {
  beforeAll(() => {
    connect();
  });
  
   
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  let user = null;
  beforeEach(async() => {
    user = JSON.parse(JSON.stringify(await User.create({ name: 'Billy' })));
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a user', () => {
    return request(app)
      .post('/api/v1/users')
      .send({ name: 'Billy' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Billy',
          __v: 0
        });
      });
  });

  it('GET all users', async() => {
    const users = await User.create([
      { name: 'Billy' },
      { name: 'Jimmy' },
      { name: 'Dalton' }
    ]);

    return request(app)
      .get('/api/v1/users')
      .then(res => {
        const usersJSON = JSON.parse(JSON.stringify(users));
        usersJSON.forEach(user => {
          expect(res.body).toContainEqual({ name: user.name, id: user._id });
        });
      });
  });

  

});
