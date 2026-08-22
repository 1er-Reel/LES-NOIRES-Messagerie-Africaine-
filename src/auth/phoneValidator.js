/**
 * LES NOIRES - Phone Number Validator
 * 
 * Valide les numéros de téléphone africains
 * Format: +2XX où XX est le code pays africain
 */

const AFRICAN_COUNTRIES = {
  // Afrique du Nord
  '212': { country: 'Maroc', prefix: '+212' },
  '213': { country: 'Algérie', prefix: '+213' },
  '216': { country: 'Tunisie', prefix: '+216' },
  '218': { country: 'Libye', prefix: '+218' },

  // Afrique de l'Ouest
  '220': { country: 'Sénégal', prefix: '+220' },
  '223': { country: 'Mali', prefix: '+223' },
  '226': { country: 'Burkina Faso', prefix: '+226' },
  '227': { country: 'Niger', prefix: '+227' },
  '228': { country: 'Togo', prefix: '+228' },
  '229': { country: 'Bénin', prefix: '+229' },
  '230': { country: 'Maurice', prefix: '+230' },
  '231': { country: 'Liberia', prefix: '+231' },
  '232': { country: 'Sierra Leone', prefix: '+232' },
  '233': { country: 'Ghana', prefix: '+233' },
  '234': { country: 'Nigeria', prefix: '+234' },
  '235': { country: 'Tchad', prefix: '+235' },
  '236': { country: 'Centrafrique', prefix: '+236' },
  '237': { country: 'Cameroun', prefix: '+237' },
  '238': { country: 'Cap-Vert', prefix: '+238' },
  '239': { country: 'Sao Tomé-et-Principe', prefix: '+239' },
  '240': { country: 'Guinée Équatoriale', prefix: '+240' },
  '241': { country: 'Gabon', prefix: '+241' },
  '242': { country: 'Congo', prefix: '+242' },
  '243': { country: 'RDC', prefix: '+243' },
  '244': { country: 'Angola', prefix: '+244' },
  '245': { country: 'Guinée-Bissau', prefix: '+245' },

  // Afrique de l'Est & Centrale
  '248': { country: 'Seychelles', prefix: '+248' },
  '249': { country: 'Soudan', prefix: '+249' },
  '250': { country: 'Rwanda', prefix: '+250' },
  '251': { country: 'Éthiopie', prefix: '+251' },
  '252': { country: 'Somalie', prefix: '+252' },
  '253': { country: 'Djibouti', prefix: '+253' },
  '254': { country: 'Kenya', prefix: '+254' },
  '255': { country: 'Tanzanie', prefix: '+255' },
  '256': { country: 'Ouganda', prefix: '+256' },
  '257': { country: 'Burundi', prefix: '+257' },
  '258': { country: 'Mozambique', prefix: '+258' },
  '260': { country: 'Zambie', prefix: '+260' },
  '261': { country: 'Madagascar', prefix: '+261' },
  '262': { country: 'Réunion', prefix: '+262' },
  '263': { country: 'Zimbabwe', prefix: '+263' },
  '264': { country: 'Namibie', prefix: '+264' },
  '265': { country: 'Malawi', prefix: '+265' },
  '266': { country: 'Lesotho', prefix: '+266' },
  '267': { country: 'Botswana', prefix: '+267' },
  '268': { country: 'Eswatini', prefix: '+268' },
  '269': { country: 'Comores', prefix: '+269' },

  // Afrique du Sud & Îles
  '27': { country: 'Afrique du Sud', prefix: '+27' },
  '291': { country: 'Érythrée', prefix: '+291' },
};

class PhoneValidator {
  /**
   * Valider un numéro de téléphone africain
   * @param {string} phoneNumber - Numéro à valider (ex: +2331234567)
   * @returns {Object} { valid: boolean, country, error }
   */
  static validate(phoneNumber) {
    // Nettoyer le numéro
    const cleaned = phoneNumber.replace(/\s/g, '').replace(/[().-]/g, '');

    // Vérifier le format de base
    if (!cleaned.startsWith('+2')) {
      return {
        valid: false,
        error: 'Le numéro doit commencer par +2 (préfixe africain)',
      };
    }

    // Extraire le code pays
    let countryCode = '';
    let foundCode = false;

    // Essayer les codes à 3 chiffres d'abord
    for (let len = 3; len >= 2; len--) {
      countryCode = cleaned.substring(1, len + 1);
      if (AFRICAN_COUNTRIES[countryCode]) {
        foundCode = true;
        break;
      }
    }

    if (!foundCode) {
      return {
        valid: false,
        error: `Code pays ${cleaned.substring(1, 4)} non reconnu (Afrique uniquement)`,
      };
    }

    // Vérifier la longueur totale
    const numberPart = cleaned.substring(1 + countryCode.length);
    
    if (numberPart.length < 7 || numberPart.length > 14) {
      return {
        valid: false,
        error: `Numéro invalide - trop court ou trop long`,
      };
    }

    // Vérifier que tout le reste est numérique
    if (!/^\d+$/.test(numberPart)) {
      return {
        valid: false,
        error: 'Le numéro ne contient que des chiffres valides',
      };
    }

    return {
      valid: true,
      phoneNumber: cleaned,
      countryCode,
      country: AFRICAN_COUNTRIES[countryCode].country,
      numberPart,
    };
  }

  /**
   * Obtenir la liste des codes africains supportés
   * @returns {Array} Liste des codes et pays
   */
  static getSupportedCountries() {
    return Object.entries(AFRICAN_COUNTRIES).map(([code, data]) => ({
      code: data.prefix,
      country: data.country,
    }));
  }
}

module.exports = PhoneValidator;
