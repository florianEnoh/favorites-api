var Hapi =  require('hapi');
var shortId = require('shortid');
const Joi = require('joi');
var fs = require('fs');

function createServer(){
  var server = new Hapi.Server();
  const messages = {};

  server.connection({
    host: 'localhost',
    port:'8888',
    routes: { cors: true }
  });



  server.route({
    method: 'GET',
    path: '/',
    handler: function(request,reply){
      reply('Hello World!').type('text/plain');
    },
    config : {
      description: 'Returns Get Hello World',
      notes: 'Skool 3 Api',
      tags: ['api','hello World']
    }
  });

  server.route({
    method: 'GET',
    path: '/favorites',
    handler: function(request,reply){
      var fileContent = fs.readFileSync('./favorites.json');
      var favoritesContent = JSON.parse(fileContent);
      console.log(favoritesContent);
      reply(favoritesContent).code(200).type('application/json');
    },
    config : {
      description: 'Returns Get Hello World',
      notes: 'Skool 3 Api',
      tags: ['api','hello World']
    }
  });

  server.route({
    method: 'POST',
    path: '/favorites',
    handler: function (request, reply) {
      var favoritesJson = [];
      var favoritesFile = fs.readFileSync('./favorites.json');
      var favoritesContent = JSON.parse(favoritesFile);
      favoritesJson.push(favoritesContent);
      favoritesJson.push(request.payload);
      fs.writeFile('favorites.json',JSON.stringify(favoritesJson),function(err, data){
          if (err) throw err;
          console.log('It\'s saved!');
      });
      reply('request').code(201)
    },
    config : {
      cors : {
        origin : ['*'],
        "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
      }

    }
  })

  server.route({
    method: 'POST',
    path: '/messages',
    handler: function(request,reply){
      const id = shortId.generate();
      messages[id] = request.payload;
      reply('request')
      .created('/messages/'+id);
    },
    config : {
      description: 'Returns data from provided Id',
      notes: 'Skool 3 Api',
      tags: ['api','POST Messages'],
      validate:{
        payload :{
          content: Joi.string().required().description('Content of Message'),
          author: Joi.string().required().description('Author of Message')
        }
      }
    }
  });



  server.register([
    require('inert'),
    require('vision'),
    require('hapi-swagger')
  ]);

  return server;
}

exports.createServer = createServer;
