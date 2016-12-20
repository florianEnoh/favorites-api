
const supertest = require('supertest');
const createServer = require('../index').createServer;


describe('POST /', function(){
	let server;
  const messagePayload = {
    content: 'Salut la compagnie',
    author: 'Flo <3',

  };

	beforeEach(function(){
		server = createServer();
		return server.start();
	});

	it('replies with status 201', function(){
		return supertest('http://localhost:8888')
		.post('/messages')
    .send(messagePayload)
		.expect(201)
	});

  it('adds a location header for the created message', function(){
		return supertest('http://localhost:8888')
		.post('/messages')
    .send(messagePayload)
		.expect('Location', /^\/messages\/.+/)
	});


	afterEach(function(){
		return server.stop();
	});
});
