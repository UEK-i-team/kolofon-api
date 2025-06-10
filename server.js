const express = require('express');
const net = require('net');
require('dotenv').config();

let server;

const NODE_LISTEN_IP = '0.0.0.0';
const TCP_PORT = 10001;
const app = express();



function startServer(port) {
    server = app.listen(port, NODE_LISTEN_IP, () => {
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
    const defaultPort = TCP_PORT || 3000;
    startServer(defaultPort);
}

