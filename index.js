"use strict";
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (req, res, next) => {
        console.log('middleware');
        return next();
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (req, res) => {
        console.log(req.query);
        return res('hello world');
    }
});
server.route({
    method: 'GET',
    path: '/items/{id}',
    handler: (req, res) => {
        console.log(req.params);
        return res('hello world');
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at: ', server.info.uri);
});
