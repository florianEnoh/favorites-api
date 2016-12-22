const createServer = require('../index').createServer;
exports.withApi = function withApi(){
  let server;

  beforeEach(function(){
    server = createServer();
    return server.start();
  });


  afterEach(function(){
    return server.stop();
  });
}
