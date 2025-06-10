const dgram = require('dgram')
const parseRtpHeader = require('./parser');
const { error } = require('console');

const RTP_PORT = 5004;
const LISTEN_IP = '192.168.10.5';

let RTP_Socket;

function startRtpReceiver() {
    RTP_Socket = dgram.createSocket('udp4');

    RTP_Socket.on(error, (err) => {
      console.error(`RTP error: ${err.stack}`)
      RTP_Socket.close();
    });

    RTP_Socket.on('message', (msg, rinfo) => {
      try {
        const RTP_header = parseRtpHeader(msg);
        if (RTP_header) {
          console.log(`[RTP header] sequence: ${RTP_header.sequenceNumber},
            payload: ${RTP_header.payloadType},
            time: ${RTP_header.timestamp}, 
            ssrc: ${RTP_header.ssrc.toString(16)}`);
        } else {
            console.log(`[RTP] Received malformed or non-RTP like packet from <span class="math-inline">\{rinfo\.address\}\:</span>{rinfo.port}`);
        }
      } catch (e) {
          console.error(`[RTP] Error parsing object: ${e.message}`)
      }
    });

    RTP_Socket.on('listening', () => {
      const address = RTP_Socket.address();
      console.log(`RTP socket listening on <span class="math-inline">\{address\.address\}\:</span>{address.port}`);
    });

    RTP_Socket.bind(RTP_PORT, LISTEN_IP, () => {
      console.log(`Attempting to bind RTP socket to <span class="math-inline">\{LISTEN\_IP\}\:</span>{RTP_PORT}`);
    });
}

function stopRtpReceiver() {
  if (RTP_Socket) {
    RTP_Socket.close();
    console.log('RTP socket closed.');
  }
}

module.exports = { startRtpReceiver, stopRtpReceiver };