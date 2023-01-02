/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../app');

describe('POST v1/create', () => {
  const name = 'Mustang Test Car';
  const price = 50000;
  const size = 'SMALL';
  const image = 'https://cdn.motor1.com/images/mgl/MNBXn/s3/2022-ford-mustang-shelby-gt500-heritage-edition-with-original-close-crop.jpg';

  let car;

  // Success case
  it('Should return response status 201 - SUCCESSFULLY CREATED', async () => {
    const accToken = await request(app).post('/v1/auth/login').send({
      email: 'admin@binar.co.id',
      password: '123456',
    });

    return request(app)
      .post('/v1/cars')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accToken.body.accessToken}`)
      .send({
        name, price, size, image,
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          size: expect.any(String),
          image: expect.any(String),
          isCurrentlyRented: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        car = res.body;
      });
  });

  // Error Case - Unauthorized
  it('Should return response status 401 - UNAUTHORIZED', async () => {
    const accToken = await request(app).post('/v1/auth/login').send({
      email: 'customer@binar.co.id',
      password: '123456',
    });

    return request(app)
      .post('/v1/cars')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accToken.body.accessToken}`)
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
      });
  });

  // Error Case - unprocessable entity
  it('Should return response status 422 - UNPROCESSABLE ENTITY', async () => {
    const name = [];
    const price = '3000';
    const size = 1;
    const image = '';

    const accToken = await request(app).post('/v1/auth/login').send({
      email: 'admin@binar.co.id',
      password: '123456',
    });

    return request(app)
      .post('/v1/cars')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accToken.body.accessToken}`)
      .send({
        name, price, size, image,
      })
      .then((res) => {
        expect(res.status).toBe(422);
        expect(res.body).toEqual({
          error: expect.objectContaining({
            name: expect.any(String),
            message: expect.any(String),
          }),
        });
      });
  });

  afterAll(async () => {
    const accToken = await request(app).post('/v1/auth/login').send({
      email: 'admin@binar.co.id',
      password: '123456',
    });

    return request(app)
      .delete(`/v1/cars/${car.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accToken.body.accessToken}`);
  });
});
