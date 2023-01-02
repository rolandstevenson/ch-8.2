/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const request = require('supertest');
const dayjs = require('dayjs');
const app = require('../../../app');

dayjs().format();

describe('POST /v1/cars/:id/rent', () => {
  let car; let accessTokenAdmin; let accessTokenCustomer;
  let rentStartedAt = dayjs().add(1, 'day');
  let rentEndedAt = dayjs(rentStartedAt).add(1, 'day');

  rentStartedAt = rentStartedAt.$d;
  rentEndedAt = rentEndedAt.$d;

  beforeAll(async () => {
    accessTokenAdmin = await request(app).post('/v1/auth/login').send({
      email: 'admin@binar.co.id',
      password: '123456',
    });

    accessTokenCustomer = await request(app).post('/v1/auth/login').send({
      email: 'customer@binar.co.id',
      password: '123456',
    });

    car = await request(app).post('/v1/cars').set('Content-Type', 'application/json').set('Authorization', `Bearer ${accessTokenAdmin.body.accessToken}`)
      .send({
        name: 'Mercedes Benz 3000',
        price: 20000,
        size: 'SMALL',
        image: 'https://source.unsplash.com/500x500',
      });

    return car;
  });

  // eslint-disable-next-line no-return-await
  it('should response with 201 as status code', async () => await request(app)
    .post(`/v1/cars/${car.body.id}/rent`)
    .set('Authorization', `Bearer ${accessTokenCustomer.body.accessToken}`)
    .set('Content-Type', 'application/json')
    .send({ rentStartedAt, rentEndedAt })
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(res.body);
    }));

  // eslint-disable-next-line no-return-await
  it('should response with 401 as status code', async () => await request(app)
    .post(`/v1/cars/${car.body.id}/rent`)
    .set('Authorization', `Bearer ${accessTokenAdmin.body.accessToken}`)
    .set('Content-Type', 'application/json')
    .send({ rentStartedAt, rentEndedAt })
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            name: expect.any(String),
            message: expect.any(String),
            details: expect.objectContaining({
              role: expect.any(String),
              reason: expect.any(String),
            }),
          }),
        }),
      );
    }));
});
