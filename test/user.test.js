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

});
