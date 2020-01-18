const http = require('http');
const url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    console.log('request for ' + pathname + ' received.');
    if (url.parse(request.url).pathname !== '/favicon.ico') {
      route(handle, pathname, response, request);
    }
  };

  http.createServer(onRequest).listen(8890);

  console.log('server has start. localhost:8890');
}

exports.start = start
