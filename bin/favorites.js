const createServer = require('../index').createServer;

const server = createServer();
server.start()
      .then(function(){
        console.log('server is started on http://localhost:8888/');
      }).catch(function(err){
        console.log(err);
      });
