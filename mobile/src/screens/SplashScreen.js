import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LES NOIRES</Text>
      <Text style={styles.subtitle}>Messagerie Africaine</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#FBBF24',
    fontSize: 16,
    marginTop: 8,
  },
});
