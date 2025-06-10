const { RrPacket } = require("rtp");

// Creating a new RrPacket
const pkt = new RrPacket();

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

// Serialize
const data = pkt.serialize(); // <Buffer ... >

// ... send the buffer
