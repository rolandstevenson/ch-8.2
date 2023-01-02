/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../../app');

describe('PUT /v1/cars/:id', () => {
  let car; let accTokenAdmin; let accTokenCustomer;

  const name = 'Range Rover UP';
  const price = 1200000;
  const size = 'LARGE';
  const image = 'https://source.unsplash.com/500x500';

  // before each test condition
  beforeEach(async () => {
    accTokenAdmin = await request(app).post('/v1/auth/login').send({
      email: 'admin@binar.co.id',
      password: '123456',
    });
    accTokenCustomer = await request(app).post('/v1/auth/login').send({
      email: 'customer@binar.co.id',
      password: '123456',
    });

    car = await request(app).post('/v1/cars').set('Content-Type', 'application/json').set('Authorization', `Bearer ${accTokenAdmin.body.accessToken}`)
      .send({
        name,
        price,
        size,
        image,
      });

    // eslint-disable-next-line no-sequences
    return car, accTokenAdmin, accTokenCustomer;
  });

  // success case - 200 OK
  it('Should return response status 200 - OK', async () => request(app)
    .put(`/v1/cars/${car.body.id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accTokenAdmin.body.accessToken}`)
    .send({
      name, price, size, image,
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          size: expect.any(String),
          image: expect.any(String),
          isCurrentlyRented: expect.any(Boolean),
        }),
      );
    }));

  // error case - unauthorized
  it('Should return response status 401 - UNAUTHORIZED', async () => request(app)
    .put(`/v1/cars/${car.body.id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accTokenCustomer.body.accessToken}`)
    .send({
      name, price, size, image,
    })
    .then((res) => {
      expect(res.status).toBe(401);
      if (res.body.details === null) {
        expect(res.body).toEqual({
          error: expect.objectContaining({
            name: expect.any(String),
            message: expect.any(String),
            details: null,
          }),
        });
        return;
      }
      expect(res.body).toEqual({
        error: expect.objectContaining({
          name: expect.any(String),
          message: expect.any(String),
          details: expect.objectContaining({
            role: expect.any(String),
            reason: expect.any(String),
          }),
        }),
      });
    }));

  // after each test condition
  afterEach(async () => request(app)
    .delete(`/v1/cars/${car.body.id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accTokenAdmin.body.accessToken}`));
});
