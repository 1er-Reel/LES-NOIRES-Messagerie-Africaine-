/**
 * LES NOIRES - Contacts Screen
 * Écran des contacts
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';

const ContactsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([
    {
      id: '1',
      name: 'Aminata Diallo',
      phone: '+2211234567',
      country: 'Sénégal',
      avatar: '👩‍🦱',
      online: true,
      section: 'A',
    },
    {
      id: '2',
      name: 'Mohamed Hassan',
      phone: '+2541234567',
      country: 'Kenya',
      avatar: '👨‍💼',
      online: false,
      section: 'M',
    },
    {
      id: '3',
      name: 'Zainab Musa',
      phone: '+2341234567',
      country: 'Nigeria',
      avatar: '👩‍💻',
      online: true,
      section: 'Z',
    },
  ]);

  const sections = [
    {
      title: 'A',
      data: contacts.filter(c => c.section === 'A'),
    },
    {
      title: 'M',
      data: contacts.filter(c => c.section === 'M'),
    },
    {
      title: 'Z',
      data: contacts.filter(c => c.section === 'Z'),
    },
  ].filter(section => section.data.length > 0);

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Chat', { name: item.name, phone: item.phone })}
    >
      <View style={styles.contactAvatarContainer}>
        <Text style={styles.contactAvatar}>{item.avatar}</Text>
        {item.online && <View style={styles.contactOnlineBadge} />}
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactCountry}>{item.country}</Text>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="phone" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message" size={20} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un contact..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderContactItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 8,
    color: colors.text,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  contactAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  contactAvatar: {
    fontSize: 36,
  },
  contactOnlineBadge: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  contactCountry: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
  },
});

export default ContactsScreen;
