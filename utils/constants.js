const constants = {
  DEFAULT_USER_SETTINGS: {
    firstName: '',
    lastName: '',
    hardinessZone: '0',
  },
  PLANTS: [
    {
      name: 'potato',
      tileInfo: 'everyone loves potatoes',
      zones: 'all',
      water: 'Wants 1 inch per day of water',
      sun: 'Wants full sun',
    },
    {
      name: 'pepper',
      tileInfo: 'ouch that\'s hot',
      water: 'Wants 0.5 inches per day of water',
      sun: 'Wants full sun',
    },
  ],
  TRAITS: {
    zones: 'Ideal Zones for Growing',
    water: 'Water Needs',
    sun: 'Sun Needs',
    timeToHarvest: 'Expected Time To Harvest',
  },
};

module.exports = constants;
