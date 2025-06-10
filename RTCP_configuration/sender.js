const { SrPacket } = require("rtp");
const dgram = require("dgram"); // Import the dgram module

// Creating a new SrPacket
const pkt = new SrPacket();
pkt.ssrc = 1;
pkt.ntp_ts = new Date();
pkt.rtp_ts = 0;

// Add reports
pkt.addReport({
  ssrc: 1, // Source identifier
  fraction: 0, // Percentage of packets lost
  lost: 0, // Cumulative number of packets lost
  last_seq: 1024, // Highest sequence number received
  jitter: 0, // Interarrival jitter
  lsr: 0, // Last SR timestamp
  dlsr: 0, // Delay since last SR
});

// Add optional extension data
pkt.ext = Buffer.alloc(12);

// Serialize the packet into a Buffer
const data = pkt.serialize(); // <Buffer ... >

// --- Sending the buffer via UDP ---

const client = dgram.createSocket("udp4"); // Create a UDP IPv4 socket

const PORT = 5004; // The port of the receiving application
const HOST = '192.168.10.5'; // The IP address of the receiving application

client.send(data, PORT, HOST, (err) => {
  if (err) {
    console.error(`Error sending packet: ${err}`);
  } else {
    console.log(`SR Packet sent to ${HOST}:${PORT}`);
    // You can optionally close the socket here if you only send one packet,
    // otherwise keep it open for continuous sending.
    // client.close();
  }
});

// Optional: Handle errors on the socket
client.on('error', (err) => {
  console.error(`Socket error: ${err.stack}`);
  client.close();
});

// Optional: Listen for the socket to be closed
client.on('close', () => {
  console.log('Socket closed');
});