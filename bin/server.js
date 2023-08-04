#!/bin/bash

import process from 'node:process';
import http from 'node:http';

const port = process.env.PORT || 4010;
const name = process.env.SERVICE || 'Unknown';

const server = http.createServer();

server.on( 'request', ( req, res ) => {
    if ( req.method === 'GET' && req.url === '/kill' )
    {
        return void process.exit( 1 );
    }

    res.writeHead( 200 ).end( 'Status ok\n' );
});

server.listen( port, () => console.log( `${name} running on http://localhost:${port}` ) );
