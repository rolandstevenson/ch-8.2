/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../app');

// success case
describe('GET /v1/auth/whoami', () => {
  it('Should return response status 200 - OK', async () => {
    const accessToken = await request(app).post('/v1/auth/login').send({
      email: 'customer@binar.co.id',
      password: '123456',
    });

    return request(app)
      .get('/v1/auth/whoami')
      .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
          image: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });

  // error case - unauthorized
  it('Should return response status 401 - UNAUTHORIZED', async () => request(app)
    .get('/v1/auth/whoami')
    .set('Authorization', `Bearer ${'invalidtoken'}`)
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        error: {
          name: expect.any(String),
          message: expect.any(String),
          details: null,
        },
      });
    }));
});
