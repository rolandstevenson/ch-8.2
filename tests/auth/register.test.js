/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../app');

describe('POST /v1/auth/register', () => {
  it('Should return response status 201 - SUCCESS', async () => {
    const name = `Vii${Math.random().toString().substring(15)}`;
    const email = `Vii${Math.random().toString().substring(15)}@binar.co.id`;
    const password = '123456';

    return request(app)
      .post('/v1/auth/register')
      .set('Content-Type', 'application/json')
      .send({ name, email, password })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
          }),
        );
      });
  });
});
