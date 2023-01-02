/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../app');

describe('POST /v1/auth/login', () => {
  const email = 'customer@binar.co.id';
  const password = '123456';

  // success login
  it('Should return response status 201 - SUCCESS', async () => request(app)
    .post('/v1/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email,
      password,
    })
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        accessToken: expect.any(String),
      });
    }));

  // failed login - incorrect password (unauthorized)
  it('Should return response status 401 - UNAUTHORIZED', async () => {
    const email = 'customer@binar.co.id';
    const password = 'lope';

    return request(app)
      .post('/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              details: expect.any(Object),
              message: expect.any(String),
              name: expect.any(String),
            },
          }),
        );
      });
  });

  // failed login - user not found
  it('Should return response status 404 - NOT FOUND', async () => {
    const email = 'sayang@binar.co.id';
    const password = 'sayang';

    return request(app)
      .post('/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              details: expect.any(Object),
              message: expect.any(String),
              name: expect.any(String),
            },
          }),
        );
      });
  });
});
