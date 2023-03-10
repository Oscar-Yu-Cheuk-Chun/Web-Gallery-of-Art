/* eslint-disable no-undef */

'use strict';

const request = require('supertest');
const app = require('./app');

describe('Testing GET /item', () => {
  test('GET succeeds', () => {
      return request(app)
      .get('/item')
      .expect(200);
  });

  test('GET returns JSON', () => {
      return request(app)
      .get('/item')
      .expect('Content-type', /json/);
  });
});

describe('Testing GET /orders', () => {
  test('GET succeeds', () => {
    return request(app)
    .get('/orders')
    .expect(200);
  });

  test('GET returns JSON', () => {
      return request(app)
      .get('/orders')
      .expect('Content-type', /json/);
  });
});

describe('Testing POST /postitem', () => {
  test('POST succeeds', () => {
    const params = {
      name: 'The Starry Night',
      artist: 'Vincent van Gogh',
      price: 99,
      src: 'image/newProduct.jpeg',
      id: 12
    };
    return request(app)
    .post('/postitem')
    .send(params)
    .expect(200);
  });

  test('POST returns JSON', () => {
    const params = {
      name: 'The Starry Night',
      artist: 'Vincent van Gogh',
      price: 99,
      src: 'image/newProduct.jpeg',
      id: 12
    };
    return request(app)
    .post('/postitem')
    .send(params)
    .expect('Content-type', /json/);
  });
});

describe('Testing POST /postorder', () => {
  test('POST succeeds', () => {
    const params = {
      total: 28,
      purchases: [{ purchaseId: 0, itemID: '0' }, { purchaseId: 1, itemID: '0' }],
      id: 0
    };
    return request(app)
    .post('/postorder')
    .send(params)
    .expect(200);
  });

  test('POST returns JSON', () => {
    const params = {
      total: 28,
      purchases: [{ purchaseId: 0, itemID: '0' }, { purchaseId: 1, itemID: '0' }],
      id: 0
    };
    return request(app)
    .post('/postorder')
    .send(params)
    .expect('Content-type', /json/);
  });
});
