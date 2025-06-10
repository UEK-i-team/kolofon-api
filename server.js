const express = require('express');

let server;

const app = express();

function startServer(port) {
    server = app.listen(port, '0.0.0.0', () => {
      console.log(`Proxy server listening at http://localhost:${port}`);
    });
    return server;
}
  
function stopServer() {
    if (server) {
      server.close();
    }
}
  
if (require.main === module) {
    const defaultPort = process.env.PORT || 3000;
    startServer(defaultPort);
}

