const crypto = require("crypto");

const algorithm = "AES-256-GCM";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  return cipher.update(text, "utf8", "hex") + cipher.final("hex");
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return (
    decipher.update(encryptedText, "hex", "utf8") + decipher.final("utf-8")
  );
}

module.exports = { encrypt, decrypt };
