'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
    const port = process.env.PORT || 3000; 

    const server = Hapi.server({
        port,
        host: 'localhost'
    });

    const Routes = require('./routes/test.routes');

    server.route(
        Routes
    );

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

