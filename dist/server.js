import http, { IncomingMessage, Server, ServerResponse } from 'http';
import config from './config/index.ts';
const server = http.createServer((req, res) => {
    console.log('server is initialized...');
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            message: "hello from node js server which is build with typescript",
            path: req.url,
        }));
    }
    ;
});
server.listen(config.port, () => {
    console.log(`server is running in port ${config.port}`);
});
