"use strict";
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});


server.route({
    method: 'POST',
    path: '/{param}',
    handler: (req, res) => {
        let query = req.query;
        let body = req.payload;
        let params = req.params;
        return res({query, body, params}).code(200);
    }
});
server.route({
        method: 'POST',
        path: '/{param}',
        handler: (req, res, next) => {
        return next();
}
});


server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at: ', server.info.uri);
});
