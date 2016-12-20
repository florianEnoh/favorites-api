
const supertest = require('supertest');
const createServer = require('../index').createServer;
describe('GET /', function(){
	let server;
	beforeEach(function(){
		server = createServer();
		return server.start();
	});


	it('replies with hello world', function(){
		return supertest('http://localhost:8888')
		.get('/')
		.expect(200)
		.expect('Content-Type',/text\/plain/)
		.expect('Hello World!');
	});

	afterEach(function(){
		return server.stop();
	});
});
