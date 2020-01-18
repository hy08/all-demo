const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');
const websocket = require('./websocket');

const handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
websocket.start();