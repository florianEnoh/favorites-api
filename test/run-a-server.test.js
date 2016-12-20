
const supertest = require('supertest');
const createServer = require('../index').createServer;
describe('GET /', function(){
	let server;
	beforeEach(function(ready){
		server = createServer();
		server.start(ready);
	});

	it('replies with hello world', function(done){
		return supertest('http://localhost:8888')
		.get('/')
		.expect(200)
		.expect('Content-Type',/text\/plain/)
		.expect('Hello World!')
		// .then(function(response){
		// 	done();
		// })
		// .catch(function(reason){
		// 	done(reason);
		// })
		//.end(done);
	});


	afterEach(function(done){
		server.stop(done);
	});
});

// server.start(function(err){
// 	done(err);
// });
