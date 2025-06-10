const express = require('express');
const { startSipListener } = require('./RTCP_configuration/sender');
const { startRtpReceiver} = require('./RTCP_configuration/receiver');
require('dotenv').config();


const app = express();
let server;

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("HELLO");
})


function startServer(port) {
    server = app.listen(port, () => {
      console.log(`Proxy server listening at http://localhost:${port}`);
      console.log('Starting VoIP listeners...');

      startSipListener();
      startRtpReceiver();

      process.on('SIGINT', () => {
        console.log('\nShutting down VoIP listeners...');
        require('./RTCP_configuration/sender').stopSipListener();
        require('./RTCP_configuration/receiver').stopRtpReceiver();
        process.exit(0);
      });

      process.on('SIGTERM', () => {
        console.log('\nShutting down VoIP listeners...');
        require('./RTCP_configuration/sender').stopSipListener();
        require('./RTCP_configuration/receiver').stopRtpReceiver();
        process.exit(0);
      })
    });
    return server;
}
  
function stopServer() {
    if (server) {
      server.close();
    }
}
  
if (require.main === module) {
    const defaultPort = PORT;
    startServer(defaultPort);
}

module.exports = app;