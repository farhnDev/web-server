const http = require('http');

const requistListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const {method, url} = request;

    if (url === '/') { //pada url ini, hanya memiliki method get
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'iki yo homepage',
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message:`koe salah mergane e ${method} ora pas`,
            }));
        }

    } else if (url === '/about') { //dengan url ini bisa menggunakan method get dan post
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'koe ws bener soale iki about',
            }))
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `iki ${name} ws bener ono ng about`,
                }))
            })
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `koe salah iki ${method} meneh bro bro`,
            }))
        }
    } else { //dan ini error salah, ketika menggunakan diantara yang bukan dari url itu di deklarasikan
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'halaman e ora ketemu bro pie ddie ?',
        }));
    }


    // if (method === 'GET') {
    //     response.end('<h1>hallo http server</h1>');
    // }

    // if (method === 'PUT') {
    // response.end('<h1>BONJUR</h1>');
    // }

    // if (method === 'POST') {
    //     let body = [];
    //
    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });
    //
    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const { name } = JSON.parse(body);
    //         response.end(`<h1>hai ${name}</h1>`);
    //     })
    // }

    // if (method === 'DELETE') {
    // response.end('<h1>YES</h1>');
    // }
};

const server = http.createServer(requistListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`);
})