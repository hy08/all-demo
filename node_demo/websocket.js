var ws = require("nodejs-websocket")

function start() {
  console.log("websocket服务已启动")
  var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
      broadcast('from sever: ' + str)
    });
    conn.on("close", function (code, reason) {
      broadcast('Connection closed')
    });
    conn.on("error", function (err) {
      if (err.code !== 'ECONNRESET') {
        // Ignore ECONNRESET and re throw anything else
        throw err
      }
    });
  }).listen(8889);

  function broadcast(str) {
    server.connections.forEach(function (connection) {
      connection.sendText(str)
    })
  }
}

exports.start = start