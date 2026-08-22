/**
 * LES NOIRES - Register Screen
 * Écran d'inscription
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import apiService from '../../services/apiService';

const RegisterScreen = ({ navigation, route }) => {
  const phoneFromRoute = route.params?.phoneNumber || '';
  
  const [phoneNumber, setPhoneNumber] = useState(phoneFromRoute);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (step === 1 && countries.length === 0) {
      loadCountries();
    }
  }, [step]);

  const loadCountries = async () => {
    try {
      const result = await apiService.getSupportedCountries();
      setCountries(result.all);
    } catch (err) {
      console.error('Erreur lors du chargement des pays:', err);
    }
  };

  const formatPhoneNumber = (text) => {
    let cleaned = text.replace(/\D/g, '');
    
    if (!cleaned.startsWith('2')) {
      cleaned = '2' + cleaned;
    }
    
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }

    return cleaned.slice(0, 13);
  };

  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    setError('');
  };

  const selectCountryCode = (code) => {
    setPhoneNumber(code);
    setShowCountries(false);
  };

  const handleRegister = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Veuillez entrer un numéro valide');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await apiService.register(phoneNumber);

      if (result.success) {
        await AsyncStorage.setItem('userPhone', result.user.phoneNumber);
        await AsyncStorage.setItem('publicKey', result.user.publicKey);
        
        Alert.alert(
          'Succès',
          'Compte créé avec succès!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Main'),
            },
          ]
        );
      }
    } catch (err) {
      setError(err.message);
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => selectCountryCode(item.code)}
    >
      <Text style={styles.countryCode}>{item.code}</Text>
      <Text style={styles.countryName}>{item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Créer un compte</Text>
      </View>

      {step === 1 ? (
        <View style={styles.form}>
          <Text style={styles.stepText}>Étape 1: Sélectionnez votre pays</Text>

          <TouchableOpacity
            style={styles.countrySelector}
            onPress={() => setShowCountries(!showCountries)}
          >
            <Icon name="earth" size={20} color="#007AFF" />
            <Text style={styles.countrySelectorText}>
              {phoneNumber || 'Sélectionnez un pays'}
            </Text>
            <Icon
              name={showCountries ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#007AFF"
            />
          </TouchableOpacity>

          {showCountries && (
            <FlatList
              data={countries}
              renderItem={renderCountryItem}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled
              style={styles.countryList}
            />
          )}

          <Text style={styles.label}>Entrez votre numéro complet</Text>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              placeholder="+234 123 456 7890"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              editable={!loading}
            />
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Icon name="alert-circle" size={16} color="#FF3B30" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="check" size={20} color="#fff" />
                <Text style={styles.buttonText}>Créer le compte</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.linkText}>Retour à la connexion</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.info}>
        <Icon name="information" size={20} color="#007AFF" />
        <Text style={styles.infoText}>
          Vos données sont chiffrées avec Ed25519. Seul vous pouvez lire vos messages.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginTop: 20,
    marginBottom: 8,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  countrySelectorText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#1a1a2e',
  },
  countryList: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    maxHeight: 300,
  },
  countryItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 16,
  },
  countryName: {
    fontSize: 14,
    color: '#1a1a2e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 14,
    color: '#1a1a2e',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    marginLeft: 8,
    color: '#FF3B30',
    fontSize: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  linkButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  info: {
    flexDirection: 'row',
    backgroundColor: '#E5F2FF',
    margin: 20,
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#0051BA',
    flex: 1,
  },
});

export default RegisterScreen;
