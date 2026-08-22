/**
 * LES NOIRES - Jokes Screen
 * Écran des blagues aléatoires
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import apiService from '../../services/apiService';

const JokesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [categories, setCategories] = useState([
    'Any',
    'Programming',
    'Science',
    'Math',
    'Knock-Knock',
  ]);

  const getRandomJoke = async () => {
    setLoading(true);
    try {
      const result = await apiService.getRandomJoke();
      if (result.success) {
        setCurrentJoke(result);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getJokeByCategory = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const result = await apiService.getJokeByCategory(category);
      if (result.success) {
        setCurrentJoke(result);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (currentJoke && !favorites.includes(currentJoke.joke)) {
      setFavorites([...favorites, currentJoke.joke]);
    }
  };

  React.useEffect(() => {
    getRandomJoke();
  }, []);

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>😂 Blagues du jour</Text>
          <Text style={styles.headerSubtitle}>
            Rires garantis avec les meilleures blagues
          </Text>
        </LinearGradient>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => getJokeByCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Joke Card */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Chargement d'une blague...</Text>
          </View>
        ) : currentJoke ? (
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.jokeCard}
          >
            <View style={styles.jokeContent}>
              <Text style={styles.jokeText}>{currentJoke.joke}</Text>
              <Text style={styles.jokeCategory}>{currentJoke.category}</Text>
            </View>
          </LinearGradient>
        ) : null}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButtonLarge}
            onPress={getRandomJoke}
            disabled={loading}
          >
            <LinearGradient
              colors={[colors.accent, colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionGradient}
            >
              <Icon name="shuffle" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Suivante</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButtonSmall, favorites.includes(currentJoke?.joke) && styles.favorited]}
            onPress={addToFavorites}
          >
            <Icon name="heart" size={24} color={favorites.includes(currentJoke?.joke) ? colors.error : colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSmall}>
            <Icon name="share-variant" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <View style={styles.favoritesSection}>
            <Text style={styles.favoritesSectionTitle}>⭐ Vos blagues favorites</Text>
            {favorites.map((fav, index) => (
              <View key={index} style={styles.favoriteItem}>
                <Text style={styles.favoriteText} numberOfLines={2}>
                  {fav}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    marginHorizontal: 20,
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: colors.surface,
    borderRadius: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: colors.text,
  },
  jokeCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 24,
    borderRadius: 16,
    minHeight: 200,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  jokeContent: {
    justifyContent: 'center',
  },
  jokeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 26,
  },
  jokeCategory: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  actionButtonLarge: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonSmall: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
  },
  actionGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  favorited: {
    backgroundColor: `${colors.error}20`,
    borderColor: colors.error,
  },
  favoritesSection: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: `${colors.primary}20`,
  },
  favoritesSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  favoriteItem: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  favoriteText: {
    fontSize: 13,
    color: colors.text,
  },
});

export default JokesScreen;
