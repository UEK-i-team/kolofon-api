function parseRtpHeader(rtpPacketBuffer) {
    if (!Buffer.isBuffer(rtpPacketBuffer) || rtpPacketBuffer.length < 12) {
      console.error("Invalid RTP packet buffer or too short.");
      return null;
    }
  
    const byte0 = rtpPacketBuffer.readUInt8(0);
    const byte1 = rtpPacketBuffer.readUInt8(1);
  
    const version = (byte0 >>> 6) & 0x03;
    const padding = (byte0 >>> 5) & 0x01;
    const extension = (byte0 >>> 4) & 0x01;
    const csrcCount = byte0 & 0x0F;
  
    const marker = (byte1 >>> 7) & 0x01;
    const payloadType = byte1 & 0x7F;
  
    const sequenceNumber = rtpPacketBuffer.readUInt16BE(2);
    const timestamp = rtpPacketBuffer.readUInt32BE(4);
    const ssrc = rtpPacketBuffer.readUInt32BE(8);

    return {
        version: version,
        padding: padding,
        extension: extension,
        csrcCount: csrcCount,
        marker: marker,
        payloadType: payloadType,
        sequenceNumber: sequenceNumber,
        timestamp: timestamp,
        ssrc: ssrc,
        payload: rtpPacketBuffer.slice(12 + (csrcCount * 4) + (extension ? rtpPacketBuffer.readUInt16BE(12+ (csrcCount * 4) + 2) * 4 : 0))
    }
  }

module.exports = { parseRtpHeader }