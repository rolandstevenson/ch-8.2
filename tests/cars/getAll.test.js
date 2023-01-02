/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../app');

describe('GET v1/cars', () => {
  it('Should return response status 200 - OK', async () => request(app)
    .get('/v1/cars')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          cars: expect.arrayContaining([expect.any(Object)]),
          meta: expect.objectContaining({
            pagination: expect.any(Object),
          }),
        }),
      );
    }));
});
