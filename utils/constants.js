const constants = {
  DEFAULT_USER_SETTINGS: {
    firstName: '',
    lastName: '',
    hardinessZone: '0',
  },
  PLANTS: [
    {
      name: 'garlic',
      tileInfo: 'keeps the vampires away',
      zones: '3 to 8',
      water: '1 to 2 inches per week',
      sun: 'Full sun - at least 6 hours per day',
      friends: [],
      enemies: [],
    },
    {
      name: 'onion',
      tileInfo: 'they go in everything so might as well grow them',
      zones: '3 to 9',
      water: '1 to 2 inches per week',
      sun: 'Full sun - at least 6 hours per day',
      friends: [],
      enemies: [],
    },
    {
      name: 'jalapeno pepper',
      tileInfo: 'ouch that\'s hot',
      zones: '5 to 11',
      water: '1 to 2 inches per week, more when hotter',
      sun: 'Full sun - at least 6 hours per day',
      friends: [],
      enemies: [],
    },
    {
      name: 'potato',
      tileInfo: 'everyone loves potatoes',
      zones: '1 to 7',
      water: '1 to 2 inches per week',
      sun: 'Full sun - at least 6 hours per day',
      friends: [],
      enemies: [],
    },
    {
      name: 'sweet potato',
      tileInfo: 'potato\'s warm-weather-loving relative',
      zones: '3 to 11',
      water: '1 to 2 inches per week',
      sun: 'Full sun - at least 6 hours per day',
      friends: [],
      enemies: [],
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
