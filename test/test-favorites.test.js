const supertest = require('supertest');
let withApi = require('./helper').withApi;
let Assert = require('assert');


describe('Test Favorites Api',function(){
  withApi();
  const postPayload = {
   "label": "Octo",
   "address": "34 avenue de l'Opéra",
   "lat": 1.1235678,
   "lng": 1.87654321,
   "color": "#123456"
 }

  it('Replies with 200 status code',function(){
    return supertest('http://localhost:8888')
    .get('/favorites')
    .expect(200);
  });

  it('Replies with an object',function(){
    return supertest('http://localhost:8888')
    .get('/favorites')
    .expect('Content-Type',/application\/json/);
  });

  it('Replies with favorites object',function(){
    return supertest('http://localhost:8888')
    .get('/favorites')
    .expect(function (res) {
      Assert.deepEqual(Object.keys(res.body[0]), Object.keys(postPayload))
    });
  });

  it('Add favorites', function () {
      return supertest('http://localhost:8888')
      .post('/favorites')
      .send(postPayload)
      .expect(201)
  })
});
