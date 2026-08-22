# 🔒 LES NOIRES — Messagerie Africaine

**La messagerie qui appartient aux Noirs**

Une plateforme de messagerie décentralisée, chiffrée, et contrôlée par l'Afrique.

## 🌍 Pourquoi LES NOIRES?

❌ **WhatsApp** — Messages stockés sur des serveurs Meta (USA/Europe)  
✅ **LES NOIRES** — Messages stockés sur le mesh AfriChain. Personne ne lit vos messages.

### Caractéristiques

📱 **Numéros africains uniquement** (+2XX - Afrique du Nord, Ouest, Centre, Est, Sud)  
📡 **Mesh relay** — De téléphone à téléphone, sans serveur central  
🔐 **Chiffrement Ed25519** — Cryptographie blockchain-grade  
🇦🇫 **Souveraineté africaine** — Aucun serveur en Europe ou aux USA  
💬 **Messages privés** — Stockage local, synchronisation peer-to-peer  

## 📁 Structure du projet

```
les-noires/
├── backend/              # Serveur de coordination (optionnel)
│   ├── auth/
│   ├── mesh/
│   └── crypto/
├── mobile/              # Application mobile (React Native)
│   ├── screens/
│   ├── components/
│   └── services/
├── crypto/              # Librairie de chiffrement
│   ├── ed25519/
│   └── merkle-tree/
├── mesh/                # Protocole P2P
│   ├── node/
│   ├── relay/
│   └── discovery/
├── docs/                # Documentation
└── tests/               # Tests automatisés
```

## 🚀 Démarrage rapide

### Installation

```bash
git clone https://github.com/1er-Reel/LES-NOIRES-Messagerie-Africaine-
cd LES-NOIRES-Messagerie-Africaine-
npm install
```

### Configuration

```bash
cp .env.example .env
# Modifier les paramètres régionaux
```

### Démarrer le serveur

```bash
npm start
```

## 🔑 Authentification par numéro africain

```javascript
// Format: +2XX (codes africains uniquement)
const supportedCountries = {
  '+212': 'Maroc',
  '+213': 'Algérie',
  '+216': 'Tunisie',
  '+220': 'Sénégal',
  '+223': 'Mali',
  '+226': 'Burkina Faso',
  '+227': 'Niger',
  '+228': 'Togo',
  '+229': 'Bénin',
  '+230': 'Maurice',
  '+231': 'Liberia',
  '+232': 'Sierra Leone',
  '+233': 'Ghana',
  '+234': 'Nigeria',
  '+235': 'Tchad',
  '+236': 'Centrafrique',
  '+237': 'Cameroun',
  '+238': 'Cap-Vert',
  '+239': 'Sao Tomé',
  '+240': 'Guinée Équatoriale',
  '+241': 'Gabon',
  '+242': 'Congo',
  '+243': 'RDC',
  '+244': 'Angola',
  '+245': 'Guinée-Bissau',
  '+248': 'Seychelles',
  '+249': 'Soudan',
  '+250': 'Rwanda',
  '+251': 'Éthiopie',
  '+252': 'Somalie',
  '+253': 'Djibouti',
  '+254': 'Kenya',
  '+255': 'Tanzanie',
  '+256': 'Ouganda',
  '+257': 'Burundi',
  '+258': 'Mozambique',
  '+260': 'Zambie',
  '+261': 'Madagascar',
  '+262': 'Réunion',
  '+263': 'Zimbabwe',
  '+264': 'Namibie',
  '+265': 'Malawi',
  '+266': 'Lesotho',
  '+267': 'Botswana',
  '+268': 'Eswatini',
  '+269': 'Comores',
  '+27': 'Afrique du Sud',
  '+291': 'Érythrée',
};
```

## 🔐 Architecture de chiffrement

### Ed25519 pour chaque message

- **Signature** — Prouver l'authenticité de l'expéditeur
- **Merkle Tree** — Vérifier l'intégrité des conversations
- **Chiffrement symétrique** — AES-256 pour les données privées

## 📡 Mesh Network

- **Nodes locaux** — Chaque téléphone est un node
- **Relais automatique** — Les messages se propagent sans serveur central
- **Découverte de pairs** — Bluetooth, WiFi Direct, ou connectivité locale
- **Synchronisation** — État d'historique distribué

## 📝 Licence

MIT — Code libre, pour l'Afrique

---

**Contactez-nous**: support@les-noires.africa