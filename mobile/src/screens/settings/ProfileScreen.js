/**
 * LES NOIRES - Profile Screen
 * Écran du profil utilisateur
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Utilisateur',
    phone: '+234 123 456 7890',
    country: 'Nigeria',
    bio: 'Bienvenue sur LES NOIRES 🌍',
  });

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarSection}
        >
          <Text style={styles.avatarEmoji}>👤</Text>
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userPhone}>{profile.phone}</Text>
          <Text style={styles.userCountry}>🌍 {profile.country}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Icon name={isEditing ? 'check' : 'pencil'} size={20} color="#FFFFFF" />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Enregistrer' : 'Modifier'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biographie</Text>
          {isEditing ? (
            <TextInput
              style={styles.bioInput}
              placeholder="Écrivez votre biographie..."
              placeholderTextColor={colors.textSecondary}
              value={profile.bio}
              onChangeText={(text) =>
                setProfile({ ...profile, bio: text })
              }
              multiline
            />
          ) : (
            <View style={styles.bioBox}>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </View>
          )}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Conversations</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Contacts</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Numéro</Text>
              <Text style={styles.infoValue}>{profile.phone}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Icon name="earth" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Pays</Text>
              <Text style={styles.infoValue}>{profile.country}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Icon name="shield-check" size={20} color={colors.success} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Chiffrement</Text>
              <Text style={styles.infoValue}>Ed25519 Activé</Text>
            </View>
          </View>
        </View>

        {/* Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          <View style={styles.activityItem}>
            <Icon name="message-text" size={18} color={colors.primary} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                Nouveau message reçu
              </Text>
              <Text style={styles.activityTime}>Il y a 2 heures</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Icon name="account-plus" size={18} color={colors.primary} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                Nouveau contact ajouté
              </Text>
              <Text style={styles.activityTime}>Hier</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  avatarEmoji: {
    fontSize: 80,
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  userCountry: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  bioBox: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  bioText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  bioInput: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    color: colors.text,
    minHeight: 80,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default ProfileScreen;
