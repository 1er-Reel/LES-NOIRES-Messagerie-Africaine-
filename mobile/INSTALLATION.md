# 📱 LES NOIRES - Application Mobile React Native

## 🎨 Design magnifique avec couleurs du ciel africain

L'application mobile change de couleurs automatiquement selon:
- **L'heure du jour** (Aube, Jour, Coucher, Nuit)
- **La saison** (Harmattan, Mousson, etc.)
- **Le thème** (Clair, Sombre, Automatique)

### 🌅 Palettes de couleurs

#### Aube (5h-7h)
- **Primaire**: Orange vif (#FF6B35)
- **Secondaire**: Orange doré (#F7931E)
- **Accent**: Jaune doré (#FDB833)

#### Jour (7h-17h)
- **Primaire**: Bleu électrique (#007AFF)
- **Secondaire**: Cyan lumineux (#00D4FF)
- **Accent**: Jaune éclatant (#FFD60A)

#### Coucher (17h-19h)
- **Primaire**: Rose magenta (#FF1744)
- **Secondaire**: Orange profond (#FF5722)
- **Accent**: Ambre doré (#FFC107)

#### Nuit (19h-5h)
- **Primaire**: Bleu ciel nocturne (#64B5F6)
- **Secondaire**: Bleu clair (#81D4FA)
- **Accent**: Jaune lune (#FFE082)

#### Harmattan (Nov-Mars)
- **Primaire**: Rouge désert (#D32F2F)
- **Secondaire**: Orange sable (#F57C00)
- **Accent**: Jaune (#FBC02D)

#### Mousson (Jun-Sep)
- **Primaire**: Vert jungle (#388E3C)
- **Secondaire**: Vert émeraude (#00897B)
- **Accent**: Vert vif (#76FF03)

## 📲 Installation et compilation APK

### Prérequis
- Node.js 14+ et npm
- Android SDK (niveau 21 minimum)
- Android Studio
- Java Development Kit (JDK) 11+

### Installation

```bash
# Cloner le projet
git clone https://github.com/1er-Reel/LES-NOIRES-Messagerie-Africaine-
cd LES-NOIRES-Messagerie-Africaine-

# Installer les dépendances
cd mobile
npm install

# Installer les pods (iOS)
cd ios
pod install
cd ..
```

### Configuration Android

1. **Créer le fichier `android/local.properties`**:
```properties
sdk.dir=/chemin/vers/android/sdk
```

2. **Générer les clés de signature**:
```bash
cd android
./gradlew signingConfig
```

### Compiler l'APK

#### APK de débogage (développement)
```bash
npm run android
# ou
cd android
./gradlew assembleDebug
```

#### APK de production (release)
```bash
cd android
./gradlew assembleRelease
```

Le fichier APK sera créé dans:
```
android/app/build/outputs/apk/release/app-release.apk
```

#### AAB pour Google Play Store
```bash
cd android
./gradlew bundleRelease
```

Le fichier AAB sera créé dans:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Tests avant compilation

```bash
# Tester sur un émulateur
npm run android

# Tester sur un appareil connecté
adb devices
npm run android

# Tests unitaires
npm test
```

## 📱 Écrans disponibles

### Authentification
- ✅ **Splash Screen** - Démarrage de l'app
- ✅ **Login Screen** - Connexion
- ✅ **Register Screen** - Inscription
- ✅ **Verify Phone** - Vérification numéro

### Navigation principale
- ✅ **Chat List** - Liste des conversations
- ✅ **Chat** - Écran de messagerie
- ✅ **Contacts** - Gestion des contacts
- ✅ **Jokes** - Blagues aléatoires
- ✅ **Settings** - Paramètres
- ✅ **Profile** - Profil utilisateur

## 🎨 Composants UI

### Gradients linéaires
- En-têtes avec couleurs primaire → secondaire
- Boutons d'action flottants
- Cartes de messages

### Couleurs dynamiques
- Adaptation automatique à l'heure du jour
- Changement saisonnier
- Modes clairs/sombres

### Iconographie
- Material Community Icons
- 1000+ icônes disponibles
- Couleurs coordonnées

## 🔧 Configuration du serveur

Modifier l'URL du serveur dans `src/services/apiService.js`:

```javascript
const API_BASE_URL = 'http://votre-ip:3000/api';
```

Pour un appareil physique, remplacez `localhost` par l'IP de votre ordinateur.

## 📦 Distribution

### Sur Google Play Store
1. Compiler l'AAB: `npm run build-aab`
2. Créer un compte développeur Google Play
3. Uploader le fichier AAB
4. Remplir les informations de l'app
5. Publier

### Installation directe (APK)
1. Compiler l'APK: `npm run build-apk`
2. Envoyer le fichier APK
3. Installer sur l'appareil: `adb install app-release.apk`

## 🐛 Dépannage

### Erreur: "React Native not found"
```bash
npm install
cd ios && pod install && cd ..
```

### Erreur: "Gradle build failed"
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### Erreur de signature
```bash
cd android
./signingConfig
cd ..
npm run build-apk
```

## 📚 Documentation supplémentaire

- [React Native Docs](https://reactnative.dev)
- [Expo](https://expo.dev)
- [Native Base](https://nativebase.io)
- [JokeAPI](https://jokeapi.dev)

## 🌍 Support multi-pays africains

L'application supporte les numéros de +50 pays africains:
- 🇸🇳 Sénégal (+221)
- 🇬🇭 Ghana (+233)
- 🇳🇬 Nigeria (+234)
- 🇰🇪 Kenya (+254)
- 🇿🇦 Afrique du Sud (+27)
- ... et bien d'autres!

## 📝 Licence

MIT - Code libre pour l'Afrique

---

**LES NOIRES** - La messagerie qui appartient aux Noirs 🌍
