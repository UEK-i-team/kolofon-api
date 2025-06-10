const dgram = require('dgram');

const SIP_PORT = 5060;
const LISTEN_IP = '0.0.0.0';

let SIP_socket;

function startSipListener() {
  SIP_socket = dgram.createSocket('udp4');

  SIP_socket.on('error', (err) => {
    console.error(`SIP socket error: ${err.stack}`);
    SIP_socket.close();
  });

  SIP_socket.on('message', (msg, rinfo) => {
    const SIP_message = msg.toString('utf-8');
    console.log(`\n--- SIP Message from <span class="math-inline">\{rinfo\.address\}\:</span>{rinfo.port} ---`);
    console.log(SIP_message);
    console.log('------------------------------------\n');
  });

  SIP_socket.on('listening', () => {
    const address = SIP_socket.address();
    console.log(`SIP socket listening on <span class="math-inline">\{address\.address\}\:</span>{address.port}`);
  });

  SIP_socket.bind(SIP_PORT, LISTEN_IP, () => {
    console.log(`Attempting to bind SIP socket to <span class="math-inline">\{LISTEN\_IP\}\:</span>{SIP_PORT}`);
  });
}

function stopSipListener() {
  if (SIP_socket) {
    SIP_socket.close();
    console.log('SIP socket closed');
  }
}

module.exports = { startSipListener, stopSipListener };