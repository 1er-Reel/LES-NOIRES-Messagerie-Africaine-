/**
 * LES NOIRES - Ed25519 Cryptography Module
 * 
 * Gère:
 * - Génération de clés Ed25519
 * - Signature et vérification des messages
 * - Chiffrement/déchiffrement AES-256
 */

const nacl = require('tweetnacl');
const crypto = require('crypto');
const { Buffer } = require('buffer');

class Ed25519Crypto {
  /**
   * Générer une nouvelle paire de clés Ed25519
   * @returns {Object} { publicKey, secretKey }
   */
  static generateKeyPair() {
    const keyPair = nacl.sign.keyPair();
    
    return {
      publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
      secretKey: Buffer.from(keyPair.secretKey).toString('hex'),
      publicKeyBuffer: keyPair.publicKey,
      secretKeyBuffer: keyPair.secretKey
    };
  }

  /**
   * Signer un message avec la clé secrète
   * @param {string} message - Message à signer
   * @param {string} secretKey - Clé secrète (hex)
   * @returns {string} Signature en hex
   */
  static signMessage(message, secretKey) {
    try {
      const secretKeyBuffer = Buffer.from(secretKey, 'hex');
      const messageBuffer = Buffer.from(message, 'utf8');
      
      const signature = nacl.sign.detached(messageBuffer, secretKeyBuffer);
      
      return Buffer.from(signature).toString('hex');
    } catch (error) {
      throw new Error(`Erreur de signature: ${error.message}`);
    }
  }

  /**
   * Vérifier la signature d'un message
   * @param {string} message - Message original
   * @param {string} signature - Signature en hex
   * @param {string} publicKey - Clé publique en hex
   * @returns {boolean} True si valide
   */
  static verifySignature(message, signature, publicKey) {
    try {
      const publicKeyBuffer = Buffer.from(publicKey, 'hex');
      const messageBuffer = Buffer.from(message, 'utf8');
      const signatureBuffer = Buffer.from(signature, 'hex');
      
      return nacl.sign.detached.verify(messageBuffer, signatureBuffer, publicKeyBuffer);
    } catch (error) {
      console.error('Erreur de vérification:', error.message);
      return false;
    }
  }

  /**
   * Générer une clé symétrique AES-256
   * @returns {string} Clé en hex (64 caractères)
   */
  static generateSymmetricKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Chiffrer un message avec AES-256-GCM
   * @param {string} plaintext - Texte à chiffrer
   * @param {string} key - Clé symétrique en hex
   * @returns {Object} { ciphertext, iv, authTag }
   */
  static encryptMessage(plaintext, key) {
    try {
      const keyBuffer = Buffer.from(key, 'hex');
      const iv = crypto.randomBytes(16);
      
      const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
      
      let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
      ciphertext += cipher.final('hex');
      
      const authTag = cipher.getAuthTag();
      
      return {
        ciphertext,
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex')
      };
    } catch (error) {
      throw new Error(`Erreur de chiffrement: ${error.message}`);
    }
  }

  /**
   * Déchiffrer un message avec AES-256-GCM
   * @param {Object} encrypted - { ciphertext, iv, authTag }
   * @param {string} key - Clé symétrique en hex
   * @returns {string} Texte déchiffré
   */
  static decryptMessage(encrypted, key) {
    try {
      const keyBuffer = Buffer.from(key, 'hex');
      const iv = Buffer.from(encrypted.iv, 'hex');
      const authTag = Buffer.from(encrypted.authTag, 'hex');
      
      const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
      decipher.setAuthTag(authTag);
      
      let plaintext = decipher.update(encrypted.ciphertext, 'hex', 'utf8');
      plaintext += decipher.final('utf8');
      
      return plaintext;
    } catch (error) {
      throw new Error(`Erreur de déchiffrement: ${error.message}`);
    }
  }

  /**
   * Créer un hash Merkle (SHA-256) d'un message
   * @param {string} message - Message
   * @returns {string} Hash en hex
   */
  static hashMessage(message) {
    return crypto
      .createHash('sha256')
      .update(message)
      .digest('hex');
  }

  /**
   * Vérifier une chaîne de Merkle
   * @param {Array} messages - Liste de messages
   * @returns {string} Root hash
   */
  static merkleRoot(messages) {
    if (!messages.length) return '';
    
    let hashes = messages.map(msg => this.hashMessage(msg));
    
    while (hashes.length > 1) {
      const newHashes = [];
      for (let i = 0; i < hashes.length; i += 2) {
        const combined = hashes[i] + (hashes[i + 1] || '');
        newHashes.push(this.hashMessage(combined));
      }
      hashes = newHashes;
    }
    
    return hashes[0];
  }
}

module.exports = Ed25519Crypto;
