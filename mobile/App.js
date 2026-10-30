import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {COLORS, THEME} from './src/theme/colors';

const chats = [
  {id: '1', name: 'Mali Connect', last: 'Là, on se retrouve demain.', time: '09:14', unread: 2},
  {id: '2', name: 'Yacine', last: 'Le code est prêt.', time: 'Hier', unread: 0},
  {id: '3', name: 'Abidjan Crew', last: 'Merci pour le message partagé.', time: 'Lun', unread: 5},
];

const accent = THEME.night;

export default function App() {
  const [phone, setPhone] = useState('+221');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: accent.primary,
        },
        topWrap: {
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 20,
          backgroundColor: accent.primary,
        },
        brand: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 26,
        },
        badge: {
          width: 42,
          height: 42,
          borderRadius: 14,
          backgroundColor: accent.accent,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        badgeTxt: {
          color: '#111827',
          fontWeight: '800',
          fontSize: 18,
        },
        title: {
          color: '#fff',
          fontSize: 28,
          fontWeight: '800',
        },
        subtitle: {
          color: 'rgba(255,255,255,0.8)',
          marginTop: 8,
          fontSize: 15,
        },
        card: {
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: 26,
          padding: 20,
          marginTop: 18,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.18)',
        },
        label: {
          color: '#E5EEF9',
          fontSize: 12,
          marginBottom: 8,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
        field: {
          backgroundColor: '#fff',
          borderRadius: 14,
          height: 52,
          paddingHorizontal: 14,
          justifyContent: 'center',
          marginBottom: 14,
        },
        input: {
          fontSize: 16,
          color: '#111827',
        },
        button: {
          backgroundColor: accent.accent,
          height: 54,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        },
        buttonText: {
          color: '#0F172A',
          fontSize: 16,
          fontWeight: '800',
        },
        helper: {
          color: 'rgba(255,255,255,0.9)',
          textAlign: 'center',
          marginTop: 12,
          fontSize: 13,
        },
        chatWrap: {
          flex: 1,
          backgroundColor: '#F8FAFC',
        },
        header: {
          backgroundColor: accent.primary,
          paddingTop: 30,
          paddingHorizontal: 20,
          paddingBottom: 18,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        headerTitle: {
          color: '#fff',
          fontSize: 26,
          fontWeight: '800',
        },
        profile: {
          borderRadius: 20,
          width: 40,
          height: 40,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        },
        chatRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 18,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: '#E2E8F0',
          backgroundColor: '#fff',
        },
        avatar: {
          width: 48,
          height: 48,
          borderRadius: 16,
          backgroundColor: accent.secondary,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        avatarText: {
          color: '#fff',
          fontWeight: '700',
          fontSize: 17,
        },
        chatName: {
          fontSize: 16,
          color: '#0F172A',
          fontWeight: '700',
        },
        chatLast: {
          color: '#475569',
          marginTop: 4,
          fontSize: 13,
        },
        chatMeta: {
          marginLeft: 'auto',
          alignItems: 'flex-end',
        },
        time: {
          color: '#64748B',
          fontSize: 11,
        },
        unread: {
          minWidth: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: accent.accent,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 6,
        },
        unreadText: {
          color: '#0F172A',
          fontWeight: '800',
          fontSize: 11,
        },
      }),
    [accent],
  );

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={accent.primary} />
        <View style={styles.topWrap}>
          <View style={styles.brand}>
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>L</Text>
            </View>
            <Text style={styles.title}>LES NOIRES</Text>
          </View>

          <Text style={styles.subtitle}>Messagerie Africaine • Sécurisée • Décentralisée</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Numéro</Text>
            <View style={styles.field}>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="+221"
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.field}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Votre mot de passe"
                secureTextEntry
                style={styles.input}
              />
            </View>

            <TouchableOpacity onPress={() => setIsLoggedIn(true)} style={styles.button}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <Text style={styles.helper}>Connectez-vous avec votre réseau africain sécurisé.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.chatWrap}>
      <StatusBar barStyle="light-content" backgroundColor={accent.primary} />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Messages</Text>
          <View style={styles.profile}>
            <Text style={{fontSize: 18, fontWeight: '800', color: accent.primary}}>N</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {chats.map((chat) => (
          <View key={chat.id} style={styles.chatRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{chat.name.charAt(0)}</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatLast}>{chat.last}</Text>
            </View>

            <View style={styles.chatMeta}>
              <Text style={styles.time}>{chat.time}</Text>
              {chat.unread > 0 ? (
                <View style={styles.unread}>
                  <Text style={styles.unreadText}>{chat.unread}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
