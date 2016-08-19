# Comparing Hapi with Express

For some time now, creating Node JS applications have been almost synonymous with Express apps, as this has clearly been the most popular framework. But aren't there any alternatives? Let's take a look on one intereting one - Hapi.js.

### Getting started

To get your server up and running, we need more or less the same amount of code as with Express, and it's pretty self-explanatory:

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
        handler: (req, res) => {
            console.log(req.query);
            return res('hello world');
        }
    });

    server.start((err) => {
        if (err) {
            throw err;
        }

        console.log('Server running at: ', server.info.uri);
    });

### Main differences

Hapi is described as a simple, yet powerful framework as it provides most of the necessary features as a part of the core package. With Express, we need to build around the core with multiple plugins, that allow reading request body, responding with JSON structure (`response.json(..)`), cookies etc. With hapi, we just need to install:

    npm install --save hapi

and get to work!

As I mentioned above, reading body and route params are included out of the box, just like this:

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

Now, when we send a POST request

    $ curl --data "bodyParam=bodyVal" http://localhost:8000/paramVal?extraParam=extraVal

We get a following response (prettified for easier read):

    {
        "query":
            {"extraParam":"extraVal"},
        "body":
            {"bodyParam":"bodyVal"},
        "params":
            {"param":"paramVal"}
    }

### Disadvantages

While I don't have much experience with Hapi, I have already saw some disadvantages comparing to Express. First of all, that _everything included_ approach is really an effect of having much much more code. Installing Express as the only dependency results in 1.5 megabytes in `node_modules`, while bare hapi ends up to be 7.1! Huge difference at the start.

Second disadvantage is nesting routes, which is not possible with Hapi. With Express, you can easily group them in separate files and include their respective route configurations in the main script. With Hapi, you end up with a main routes file looking like this:

    server.route({
        method: 'GET',
        path: '/items',
        handler: getAllItems
    });
    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: getItemById
    });
    server.route({
        method: 'POST',
        path: '/items/{id}',
        handler: saveItem
    });
    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: deleteItem
    });

Now imagine if you need more categories than `/items`. Messy, right?

Last thing I was surprised to be unavailable is creating middlewares. With Express, you can easily add some logging, passing useful global values to all (or some) request handlers etc. With Hapi it is not possible, because if you try to have multiple handlers at the same path, you get an error:

    Error: New route / conflicts with existing /

To sum up, I would not recommend Hapi for anyone who wants to create a more comlex Node application, but on the other hand you might want to explore it for a while. Maybe you find it just perfect for you use case.
