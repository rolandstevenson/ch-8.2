/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../../app');

describe('GET v1/cars/:id', () => {
  it('Should return response status 200 - OK', async () => {
    const id = 1;

    return request(app)
      .get(`/v1/cars/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(response.body);
      });
  });
});
