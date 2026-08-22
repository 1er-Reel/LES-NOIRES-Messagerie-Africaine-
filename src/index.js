/**
 * LES NOIRES - Messagerie Africaine Décentralisée
 * 
 * Application principale
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Importations locales
const PhoneValidator = require('./auth/phoneValidator');
const Ed25519Crypto = require('./crypto/ed25519');
const MeshNode = require('./mesh/meshNode');

// Configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialiser Express
const app = express();

// Middlewares de sécurité
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store utilisateurs et nœuds (en mémoire pour démo)
const users = new Map();
const meshNodes = new Map();

// ============================================================================
// ROUTES DE SANTÉ
// ============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'LES NOIRES',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// ROUTES D'AUTHENTIFICATION
// ============================================================================

/**
 * Créer un compte utilisateur
 * POST /api/auth/register
 */
app.post('/api/auth/register', (req, res) => {
  const { phoneNumber } = req.body;

  // Valider le numéro africain
  const validation = PhoneValidator.validate(phoneNumber);
  
  if (!validation.valid) {
    return res.status(400).json({
      error: validation.error,
      details: 'Utilisez un numéro africain (+2XX)',
    });
  }

  // Vérifier si l'utilisateur existe déjà
  if (users.has(validation.phoneNumber)) {
    return res.status(409).json({
      error: 'Utilisateur déjà enregistré',
    });
  }

  // Générer les clés de chiffrement
  const keyPair = Ed25519Crypto.generateKeyPair();
  const symmetricKey = Ed25519Crypto.generateSymmetricKey();

  // Créer l'utilisateur
  const user = {
    phoneNumber: validation.phoneNumber,
    country: validation.country,
    createdAt: Date.now(),
    publicKey: keyPair.publicKey,
    secretKey: keyPair.secretKey,
    symmetricKey,
    verified: false,
  };

  users.set(validation.phoneNumber, user);

  // Créer un nœud mesh pour cet utilisateur
  const meshNode = new MeshNode(validation.phoneNumber, {
    maxPeers: 50,
    discoveryInterval: 30000,
  });
  
  meshNodes.set(validation.phoneNumber, meshNode);

  res.status(201).json({
    success: true,
    message: 'Compte créé avec succès',
    user: {
      phoneNumber: user.phoneNumber,
      country: user.country,
      publicKey: user.publicKey,
    },
  });
});

/**
 * Vérifier un numéro de téléphone
 * POST /api/auth/verify
 */
app.post('/api/auth/verify', (req, res) => {
  const { phoneNumber } = req.body;

  const validation = PhoneValidator.validate(phoneNumber);
  
  if (!validation.valid) {
    return res.status(400).json({
      error: validation.error,
    });
  }

  const isRegistered = users.has(validation.phoneNumber);

  res.json({
    valid: true,
    phoneNumber: validation.phoneNumber,
    country: validation.country,
    isRegistered,
  });
});

// ============================================================================
// ROUTES DE MESSAGERIE
// ============================================================================

/**
 * Envoyer un message chiffré
 * POST /api/messages/send
 */
app.post('/api/messages/send', (req, res) => {
  const { fromPhone, toPhone, message } = req.body;

  // Valider les numéros
  const fromValidation = PhoneValidator.validate(fromPhone);
  const toValidation = PhoneValidator.validate(toPhone);

  if (!fromValidation.valid || !toValidation.valid) {
    return res.status(400).json({
      error: 'Numéro(s) de téléphone invalide(s)',
    });
  }

  const fromUser = users.get(fromValidation.phoneNumber);
  if (!fromUser) {
    return res.status(401).json({
      error: 'Utilisateur non enregistré',
    });
  }

  // Chiffrer le message
  const encrypted = Ed25519Crypto.encryptMessage(message, fromUser.symmetricKey);
  
  // Signer le message
  const messageStr = JSON.stringify(encrypted);
  const signature = Ed25519Crypto.signMessage(messageStr, fromUser.secretKey);

  // Obtenir le nœud mesh de l'expéditeur
  const meshNode = meshNodes.get(fromValidation.phoneNumber);
  if (meshNode && !meshNode.isOnline) {
    meshNode.start();
  }

  // Envoyer via le réseau mesh
  const messageId = meshNode.sendMessage({
    to: toValidation.phoneNumber,
    content: messageStr,
    signature,
  });

  res.json({
    success: true,
    messageId,
    from: fromValidation.phoneNumber,
    to: toValidation.phoneNumber,
    encrypted: true,
    timestamp: Date.now(),
  });
});

/**
 * Récupérer les messages d'un utilisateur
 * GET /api/messages/:phoneNumber
 */
app.get('/api/messages/:phoneNumber', (req, res) => {
  const { phoneNumber } = req.params;

  const validation = PhoneValidator.validate(phoneNumber);
  if (!validation.valid) {
    return res.status(400).json({
      error: 'Numéro invalide',
    });
  }

  const meshNode = meshNodes.get(validation.phoneNumber);
  if (!meshNode) {
    return res.status(404).json({
      error: 'Nœud utilisateur non trouvé',
    });
  }

  const messages = Array.from(meshNode.messageHistory.values())
    .filter(msg => msg.to === validation.phoneNumber || msg.from === validation.phoneNumber)
    .map(msg => ({
      id: msg.id,
      from: msg.from,
      to: msg.to,
      timestamp: msg.timestamp,
      hops: msg.hops,
      delivered: msg.delivered,
    }));

  res.json({
    phoneNumber: validation.phoneNumber,
    messageCount: messages.length,
    messages,
  });
});

// ============================================================================
// ROUTES DU RÉSEAU MESH
// ============================================================================

/**
 * Démarrer un nœud mesh
 * POST /api/mesh/start
 */
app.post('/api/mesh/start', (req, res) => {
  const { phoneNumber } = req.body;

  const validation = PhoneValidator.validate(phoneNumber);
  if (!validation.valid) {
    return res.status(400).json({
      error: 'Numéro invalide',
    });
  }

  const meshNode = meshNodes.get(validation.phoneNumber);
  if (!meshNode) {
    return res.status(404).json({
      error: 'Utilisateur non trouvé',
    });
  }

  meshNode.start();

  res.json({
    success: true,
    message: 'Nœud démarré',
    nodeId: meshNode.nodeId,
    phoneNumber: validation.phoneNumber,
  });
});

/**
 * Obtenir les statistiques du nœud mesh
 * GET /api/mesh/stats/:phoneNumber
 */
app.get('/api/mesh/stats/:phoneNumber', (req, res) => {
  const { phoneNumber } = req.params;

  const validation = PhoneValidator.validate(phoneNumber);
  if (!validation.valid) {
    return res.status(400).json({
      error: 'Numéro invalide',
    });
  }

  const meshNode = meshNodes.get(validation.phoneNumber);
  if (!meshNode) {
    return res.status(404).json({
      error: 'Utilisateur non trouvé',
    });
  }

  res.json(meshNode.getStats());
});

/**
 * Obtenir la liste des pairs connectés
 * GET /api/mesh/peers/:phoneNumber
 */
app.get('/api/mesh/peers/:phoneNumber', (req, res) => {
  const { phoneNumber } = req.params;

  const validation = PhoneValidator.validate(phoneNumber);
  if (!validation.valid) {
    return res.status(400).json({
      error: 'Numéro invalide',
    });
  }

  const meshNode = meshNodes.get(validation.phoneNumber);
  if (!meshNode) {
    return res.status(404).json({
      error: 'Utilisateur non trouvé',
    });
  }

  res.json({
    phoneNumber: validation.phoneNumber,
    peerCount: meshNode.peers.size,
    peers: meshNode.getPeersList(),
  });
});

// ============================================================================
// ROUTES D'INFORMATION
// ============================================================================

/**
 * Lister les pays africains supportés
 * GET /api/countries
 */
app.get('/api/countries', (req, res) => {
  const countries = PhoneValidator.getSupportedCountries();

  res.json({
    supported: true,
    count: countries.length,
    all: countries,
  });
});

// ============================================================================
// GESTION DES ERREURS
// ============================================================================

app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
  });
});

app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  
  res.status(500).json({
    error: 'Erreur serveur',
    message: NODE_ENV === 'development' ? err.message : 'Une erreur est survenue',
  });
});

// ============================================================================
// DÉMARRAGE DU SERVEUR
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                  LES NOIRES                            ║
║           Messagerie Africaine Décentralisée           ║
║                                                        ║
║  La messagerie qui appartient aux Noirs                ║
║  🌍 Serveur démarré sur le port ${PORT}                    ║
║  📍 Environnement: ${NODE_ENV}                                   ║
║                                                        ║
║  Documentation: https://les-noires.africa              ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
