var Hapi =  require('hapi');
function createServer(){
  var server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port:'8888'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request,reply){
      reply('Hello World!').type('text/plain');
    }
  });

  server.route({
    method: 'POST',
    path: '/messages',
    handler: function(request,reply){
      reply('request')
      .created('/messages/1');
      //console.log(request);
    }
  });

  return server;
}

exports.createServer = createServer;
