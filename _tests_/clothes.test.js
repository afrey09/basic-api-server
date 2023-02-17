'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);
const { sequelizeDB } = require('../src/models');


beforeAll(async () => {
  await sequelizeDB.sync();
});

afterAll(async () => {
  await sequelizeDB.drop();
});

describe('server', () => {
  it('create clothes', async () => {
    const response = await request.post('/clothes').send({
      name: 'T-shirt',
      description: 'one t-shirt',
      price: 1000,

    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('T-shirt');
    expect(response.body.description).toEqual('one t-shirt');
    expect(response.body.price).toEqual(1000);
    expect(response.body.id).toBeTruthy();
  });

  it('get clothes', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('T-shirt');
    expect(response.body[0].description).toEqual('one t-shirt');
    expect(response.body[0].price).toEqual(1000);
    expect(response.body[0].id).toBeTruthy();
  });

  it(`gets all clothes`, async () => {
    const response = await request.get('/clothes');

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deletes an item', async () => {
    const response = await request.delete('/clothes/1');
    expect(response.status).toEqual(200);
  });

  it('updates an item', async () => {
    const response = await request.put('/clothes/1').send({
      name: 'Pants',
      description: 'A Pants',
      price: 2000,
    });
    expect(response.status).toEqual(200);

  });

});
