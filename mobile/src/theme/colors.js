/**
 * LES NOIRES - Theme Colors
 * Palette générée par le Ciel Africain
 * Couleurs qui changent avec les saisons et l'heure du jour
 */

const HOUR = new Date().getHours();
const MONTH = new Date().getMonth();

// Palette Aube (5h-7h)
const DAWN_PALETTE = {
  primary: '#FF6B35',      // Orange vif
  secondary: '#F7931E',    // Orange doré
  accent: '#FDB833',       // Jaune doré
  background: '#0F1419',   // Noir profond
  surface: '#1A1F2E',      // Gris très foncé
  text: '#FFFFFF',         // Blanc pur
  textSecondary: '#B0B8C1', // Gris clair
  success: '#4CAF50',      // Vert
  warning: '#FF9800',      // Orange
  error: '#F44336',        // Rouge
  info: '#2196F3',         // Bleu
  gradient1: '#FF6B35',
  gradient2: '#FDB833',
};

// Palette Jour (7h-17h)
const DAY_PALETTE = {
  primary: '#007AFF',      // Bleu électrique
  secondary: '#00D4FF',    // Cyan lumineux
  accent: '#FFD60A',       // Jaune éclatant
  background: '#F5F5F5',   // Gris très clair
  surface: '#FFFFFF',      // Blanc pur
  text: '#1a1a2e',         // Noir foncé
  textSecondary: '#666666', // Gris moyen
  success: '#34C759',      // Vert vif
  warning: '#FF9500',      // Orange vif
  error: '#FF3B30',        // Rouge vif
  info: '#00B0FF',         // Bleu cyan
  gradient1: '#007AFF',
  gradient2: '#00D4FF',
};

// Palette Coucher (17h-19h)
const SUNSET_PALETTE = {
  primary: '#FF1744',      // Rose magenta
  secondary: '#FF5722',    // Orange profond
  accent: '#FFC107',       // Ambre doré
  background: '#1A0033',   // Violet très foncé
  surface: '#2D1B4E',      // Violet foncé
  text: '#FFFFFF',         // Blanc pur
  textSecondary: '#E0B8FF', // Violet clair
  success: '#66BB6A',      // Vert tendre
  warning: '#FFCA28',      // Ambre
  error: '#EF5350',        // Rose rouge
  info: '#AB47BC',         // Violet
  gradient1: '#FF1744',
  gradient2: '#FF5722',
};

// Palette Nuit (19h-5h)
const NIGHT_PALETTE = {
  primary: '#64B5F6',      // Bleu ciel nocturne
  secondary: '#81D4FA',    // Bleu clair
  accent: '#FFE082',       // Jaune lune
  background: '#0D1B2A',   // Noir profond
  surface: '#1A2332',      // Bleu très foncé
  text: '#E3F2FD',         // Blanc bleuté
  textSecondary: '#90CAF9', // Bleu clair
  success: '#81C784',      // Vert doux
  warning: '#FFB74D',      // Orange doux
  error: '#E57373',        // Rose doux
  info: '#64B5F6',         // Bleu nuit
  gradient1: '#64B5F6',
  gradient2: '#81D4FA',
};

// Palette Saison - Afrique
const getSasonalPalette = () => {
  // Harmattan (Novembre-Mars) - Saison sèche du Sahel
  if (MONTH >= 10 || MONTH < 3) {
    return {
      primary: '#D32F2F',    // Rouge désert
      secondary: '#F57C00',  // Orange sable
      accent: '#FBC02D',     // Jaune Harmattan
      background: '#1a1a2e',
      surface: '#2D2D44',
      text: '#FFFFFF',
      textSecondary: '#E0E0E0',
      success: '#7CB342',
      warning: '#FFA726',
      error: '#E53935',
      info: '#1976D2',
      gradient1: '#D32F2F',
      gradient2: '#FBC02D',
    };
  }
  // Mousson (Juin-Septembre) - Saison verte
  if (MONTH >= 5 && MONTH < 9) {
    return {
      primary: '#388E3C',    // Vert jungle
      secondary: '#00897B',  // Vert émeraude
      accent: '#76FF03',     // Vert vif
      background: '#0D2818',
      surface: '#1B5E20',
      text: '#FFFFFF',
      textSecondary: '#C8E6C9',
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#FF5252',
      info: '#0277BD',
      gradient1: '#388E3C',
      gradient2: '#76FF03',
    };
  }
  // Saison moyenne
  return DAY_PALETTE;
};

const getPaletteByTime = () => {
  if (HOUR >= 5 && HOUR < 7) return DAWN_PALETTE;     // Aube
  if (HOUR >= 7 && HOUR < 17) return DAY_PALETTE;     // Jour
  if (HOUR >= 17 && HOUR < 19) return SUNSET_PALETTE; // Coucher
  return NIGHT_PALETTE;                                // Nuit
};

// Sélectionner la palette active
const ACTIVE_PALETTE = getPaletteByTime();

const colors = {
  ...ACTIVE_PALETTE,
  // Palettes additionnelles pour les variations
  dawn: DAWN_PALETTE,
  day: DAY_PALETTE,
  sunset: SUNSET_PALETTE,
  night: NIGHT_PALETTE,
  seasonal: getSasonalPalette(),
  // Couleurs spéciales
  success: ACTIVE_PALETTE.success,
  warning: ACTIVE_PALETTE.warning,
  error: ACTIVE_PALETTE.error,
  transparent: 'rgba(0,0,0,0)',
};

export default colors;
