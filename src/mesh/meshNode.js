/**
 * LES NOIRES - Mesh Network Node
 * 
 * Gère:
 * - Découverte de pairs (Peer Discovery)
 * - Relais de messages (Message Relay)
 * - Synchronisation d'état (State Sync)
 */

const EventEmitter = require('events');
const { v4: uuidv4 } = require('uuid');

class MeshNode extends EventEmitter {
  constructor(phoneNumber, options = {}) {
    super();
    
    this.nodeId = uuidv4();
    this.phoneNumber = phoneNumber;
    this.peers = new Map();
    this.messageQueue = [];
    this.messageHistory = new Map();
    this.relayCache = new Set();
    
    this.maxPeers = options.maxPeers || 50;
    this.relayTimeout = options.relayTimeout || 5000;
    this.discoveryInterval = options.discoveryInterval || 30000;
    this.maxHops = options.maxHops || 5;
    
    this.isOnline = false;
    this.startTime = Date.now();
  }

  start() {
    this.isOnline = true;
    console.log(`[${this.phoneNumber}] Nœud démarré (ID: ${this.nodeId})`);
    this.startPeerDiscovery();
    this.emit('started');
  }

  stop() {
    this.isOnline = false;
    this.peers.clear();
    console.log(`[${this.phoneNumber}] Nœud arrêté`);
    this.emit('stopped');
  }

  startPeerDiscovery() {
    this.discoveryTimer = setInterval(() => {
      if (!this.isOnline) return;
      console.log(`[${this.phoneNumber}] Scan de découverte (${this.peers.size} pairs)`);
      this.emit('peer_discovery');
    }, this.discoveryInterval);
  }

  addPeer(peer) {
    if (this.peers.size >= this.maxPeers) return false;
    const peerId = peer.nodeId || peer.id;
    if (peerId === this.nodeId || this.peers.has(peerId)) return false;

    this.peers.set(peerId, {
      id: peerId,
      phoneNumber: peer.phoneNumber,
      connectedAt: Date.now(),
      messagesSent: 0,
      messagesReceived: 0,
      latency: 0,
      isActive: true,
    });

    console.log(`[${this.phoneNumber}] ✓ Pair ajouté: ${peer.phoneNumber}`);
    this.emit('peer_added', peer);
    return true;
  }

  removePeer(peerId) {
    if (this.peers.has(peerId)) {
      const peer = this.peers.get(peerId);
      this.peers.delete(peerId);
      console.log(`[${this.phoneNumber}] ✗ Pair déconnecté: ${peer.phoneNumber}`);
      this.emit('peer_removed', peerId);
    }
  }

  sendMessage(message) {
    if (!this.isOnline) throw new Error('Nœud hors ligne');

    const msgId = uuidv4();
    const wrappedMessage = {
      id: msgId,
      from: this.phoneNumber,
      to: message.to,
      content: message.content,
      signature: message.signature,
      timestamp: Date.now(),
      hops: 0,
      maxHops: this.maxHops,
      route: [this.nodeId],
      delivered: false,
    };

    this.messageHistory.set(msgId, wrappedMessage);
    this.messageQueue.push(wrappedMessage);
    console.log(`[${this.phoneNumber}] 📤 Message envoyé (ID: ${msgId}) à ${message.to}`);
    this.relayMessage(wrappedMessage);
    return msgId;
  }

  relayMessage(message) {
    if (message.hops >= message.maxHops) return;
    if (this.relayCache.has(message.id)) return;
    this.relayCache.add(message.id);

    this.peers.forEach((peerData, peerId) => {
      if (!message.route.includes(peerId) && peerData.isActive) {
        const relayedMessage = {
          ...message,
          hops: message.hops + 1,
          route: [...message.route, this.nodeId],
        };
        console.log(`[${this.phoneNumber}] 🔀 Relais vers ${peerData.phoneNumber}`);
        this.emit('message_relay', { toPeer: peerId, message: relayedMessage });
        peerData.messagesSent++;

        setTimeout(() => {
          this.relayCache.delete(message.id);
        }, this.relayTimeout);
      }
    });
  }

  receiveMessage(message) {
    console.log(`[${this.phoneNumber}] 📥 Message reçu (ID: ${message.id}) de ${message.from}`);
    this.messageHistory.set(message.id, message);
    if (message.to !== this.phoneNumber && message.hops < message.maxHops) {
      this.relayMessage(message);
    }
    this.emit('message_received', message);
  }

  getStats() {
    const uptimeMs = Date.now() - this.startTime;
    const uptimeHours = (uptimeMs / (1000 * 60 * 60)).toFixed(2);
    let totalMessagesSent = 0;
    let totalMessagesReceived = 0;
    this.peers.forEach(peer => {
      totalMessagesSent += peer.messagesSent;
      totalMessagesReceived += peer.messagesReceived;
    });
    return {
      nodeId: this.nodeId,
      phoneNumber: this.phoneNumber,
      isOnline: this.isOnline,
      peers: this.peers.size,
      messageQueueLength: this.messageQueue.length,
      messageHistorySize: this.messageHistory.size,
      totalMessagesSent,
      totalMessagesReceived,
      uptimeHours: parseFloat(uptimeHours),
    };
  }

  getPeersList() {
    return Array.from(this.peers.values()).map(peer => ({
      ...peer,
      connectedSince: new Date(peer.connectedAt).toISOString(),
    }));
  }
}

module.exports = MeshNode;
