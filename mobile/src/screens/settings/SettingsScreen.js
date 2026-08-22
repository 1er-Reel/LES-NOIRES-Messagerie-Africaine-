/**
 * LES NOIRES - Settings Screen
 * Écran des paramètres
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../theme/colors';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [meshEnabled, setMeshEnabled] = useState(true);

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', onPress: () => {} },
        {
          text: 'Déconnecter',
          onPress: async () => {
            await AsyncStorage.removeItem('userPhone');
            navigation.replace('Auth');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, description, onPress, rightComponent }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={24} color={colors.primary} style={styles.settingIcon} />
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profil Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <SettingItem
            icon="account-circle"
            title="Mon Profil"
            description="Gérer les informations de profil"
            onPress={() => navigation.navigate('Profile')}
          />
          <SettingItem
            icon="phone"
            title="Numéro de téléphone"
            description="+234 123 456 7890"
          />
        </View>

        {/* Sécurité Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Sécurité</Text>
          <SettingItem
            icon="lock"
            title="Chiffrement Ed25519"
            description="Vos messages sont sécurisés"
          />
          <SettingItem
            icon="network"
            title="Réseau Mesh P2P"
            description="Activé"
            rightComponent={
              <Switch
                value={meshEnabled}
                onValueChange={setMeshEnabled}
                trackColor={{ false: colors.textSecondary, true: colors.success }}
                thumbColor={meshEnabled ? colors.primary : colors.textSecondary}
              />
            }
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <SettingItem
            icon="bell"
            title="Notifications"
            description="Activez ou désactivez les notifications"
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.textSecondary, true: colors.success }}
                thumbColor={notifications ? colors.primary : colors.textSecondary}
              />
            }
          />
          <SettingItem
            icon="sound"
            title="Son des messages"
            description="Notification sonore activée"
          />
        </View>

        {/* Apparence Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Apparence</Text>
          <SettingItem
            icon="palette"
            title="Thème automatique"
            description="Adapté au ciel africain"
            rightComponent={
              <View style={styles.colorBadges}>
                <View
                  style={[styles.colorBadge, { backgroundColor: colors.primary }]}
                />
                <View
                  style={[styles.colorBadge, { backgroundColor: colors.secondary }]}
                />
                <View
                  style={[styles.colorBadge, { backgroundColor: colors.accent }]}
                />
              </View>
            }
          />
          <SettingItem
            icon="moon-waning-crescent"
            title="Mode sombre"
            description="Adapté automatiquement"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.textSecondary, true: colors.success }}
                thumbColor={darkMode ? colors.primary : colors.textSecondary}
              />
            }
          />
        </View>

        {/* À propos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ À propos</Text>
          <SettingItem
            icon="information"
            title="Version"
            description="0.1.0"
          />
          <SettingItem
            icon="file-document"
            title="Conditions d'utilisation"
            description="Lire nos conditions"
          />
          <SettingItem
            icon="shield-alert"
            title="Politique de confidentialité"
            description="Vos données sont privées"
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleLogout}
          >
            <Icon name="logout" size={20} color="#FFFFFF" />
            <Text style={styles.dangerButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            LES NOIRES © 2026{`\n`}La messagerie qui appartient aux Noirs
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: `${colors.primary}40`,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  colorBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  colorBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 20,
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SettingsScreen;
