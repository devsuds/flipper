// const BLACK_N_WHITE_ICONS = {
//   BLACK_SUN_WITH_RAYS: 9728,
//   CLOUD: 9729,
//   UMBRELLA: 9730,
//   BLACK_STAR: 9733,
//   BLACK_TELEPHONE: 9742,
//   YIN_YANG: 9775,
//   HAMMER_AND_SICKLE: 9773,
//   LAST_QUARTER_MOON: 9790,
//   BLACK_SMILING_FACE: 9787,
//   BLACK_CLUB_SUIT: 9827,
//   HOT_SPRINGS: 9832,
//   BEAMED_SIXTEENTH_NOTES: 9836,
//   EAST_SYRIAC_CROSS: 9841,
//   BLACK_UNIVERSAL_RECYCLING_SYMBOL: 9851,
//   BLACK_FLAG: 9873,
//   BLACK_CHESS_QUEEN: 9819,
//   BLACK_CHESS_KNIGHT: 9822,
//   WARNING_SIGN: 9888,
// };

export const GAME_MODE_CONF = {
  easy: {
    n_cards: 16,
    duration: 60 * 1000,
  },
  medium: {
    n_cards: 24,
    duration: 90 * 1000,
  },
  hard: {
    n_cards: 32,
    duration: 120 * 1000,
  },
};

/*
  This method will double each element and shuffle and return final list of random elements
*/
export const select_card_icons = (n) => {
  const array = select_random_elements(n);
  return shuffle_array([...array, ...array]);
};

const COLOR_ICONS = {
  UMBRELLA_WITH_RAIN_DROPS: 9748,
  COMET: 9732,
  SHAMROCK: 9752,
  WHITE_UP_POINTING_INDEX: 9757,
  HOT_BEVERAGE: 9749,
  SKULL_AND_CROSSBONES: 9760,
  RADIOACTIVE_SIGN: 9762,
  BIOHAZARD_SIGN: 9763,
  ORTHODOX_CROSS: 9766,
  STAR_AND_CRESCENT: 9770,
  PEACE_SYMBOL: 9774,
  WHEEL_OF_DHARMA: 9784,
  WHEELCHAIR_SYMBOL: 9855,
  ALEMBIC: 9879,
  ATOM_SYMBOL: 9883,
  FLEUR_DE_LIS: 9884,
  HIGH_VOLTAGE_SIGN: 9889,
  COFFIN: 9904,
  FUNERAL_URN: 9905,
  SOCCER_BALL: 9917,
  BASEBALL: 9918,
  SNOWMAN_WITHOUT_SNOW: 9924,
  SUN_BEHIND_CLOUD: 9925,
  THUNDER_CLOUD_AND_RAIN: 9928,
  HELMET_WITH_WHITE_CROSS: 9937,
  NO_ENTRY: 9940,
  SHINTO_SHRINE: 9961,
  MOUNTAIN: 9968,
  UMBRELLA_ON_GROUND: 9969,
  FOUNTAIN: 9970,
  FLAG_IN_HOLE: 9971,
  FERRY: 9972,
  SAILBOAT: 9973,
  SKIER: 9975,
  PERSON_WITH_BALL: 9977,
  TENT: 9978,
  FUEL_PUMP: 9981,
  WRIST_WATCH: 8986,
  // RAINBOW: 127752,
  // DOUGHNUT: 127849,
  // WINE_GLASS: 127863,
  // GIFT: 127873,
  // BALOON: 127880,
  // SCHOOL_BAG: 127890,
  // BOWLING: 127923,
  // RUGBY: 127944,
  // BEACH: 127958,
  // TENT_COLOR: 127957,
  // STEADIUM: 127967,
  // ROCKET: 128640,
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const shuffle_array = (array) => {
  let copy = [],
    n = array.length,
    i;
  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);
    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }
  return copy;
};

const select_random_elements = (n) => {
  // Select and make a first shuffle
  const elements = shuffle_array(Object.values(COLOR_ICONS));
  // 1. Randomly select starting index => between 0 to a (Logic: a = array_lenth - no_of_elements_to_select+1)
  // Adding 1 on abovelogic since getRandomInt() returns value excluding supplied argument (i.e. max)
  const start_index = getRandomInt(elements.length - n + 1);
  // 2. Select n-th index (Logic: start_index + no_of_elements_to_select -1)
  const end_index = start_index + n - 1;
  return elements.filter((elem) => {
    const index = elements.indexOf(elem);
    return index >= start_index && index <= end_index;
  });
};
