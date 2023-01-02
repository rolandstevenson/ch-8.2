/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('Should return response status 200 - OK', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'OK',
      message: 'BCR API is up and running!',
    });
  });

  it('Should return response status 404 - Not Found', async () => {
    const response = await request(app).get('/not-found');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      ...response.body,
    });
  });
});
