import crypto from 'crypto';

function base64(bytes) {
  // generate random bytes
  const randomBytesBuffer = crypto.randomBytes(bytes);
  return randomBytesBuffer.toString('base64');
}

const module = { base64 };
export default module;
