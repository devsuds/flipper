export const GAME_MODE_CONF = {
  easy: {
    n_cards: 16,
    duration: 60 * 1000,
    points_per_matched_pair: 10,
    time_bonus: 5, // per second
    wining_bonus: 5,
    min_click_bonus_pro: 25, // per less click than limit
    min_click_bonus_warrior: 50, // per less click than limit
  },
  medium: {
    n_cards: 24,
    duration: 90 * 1000,
    points_per_matched_pair: 10,
    time_bonus: 8, // per second
    wining_bonus: 10,
    min_click_bonus_pro: 40, // per less click than limit
    min_click_bonus_warrior: 80, // per less click than limit
  },
  hard: {
    n_cards: 32,
    duration: 120 * 1000,
    points_per_matched_pair: 10,
    time_bonus: 10, // per second
    wining_bonus: 20,
    min_click_bonus_pro: 50, // per less click than limit
    min_click_bonus_warrior: 100, // per less click than limit
  },
};

const _min_click_bonus_calculator = (mode, n_clicks) => {
  const {
    n_cards,
    min_click_bonus_warrior,
    min_click_bonus_pro,
    wining_bonus,
  } = GAME_MODE_CONF[mode];
  const warrior_limit = n_cards + n_cards / 4; // A predefined rule
  const pro_limit = warrior_limit + n_cards / 4; // // A predefined rule
  return n_clicks <= warrior_limit
    ? min_click_bonus_warrior +
        min_click_bonus_warrior * (n_clicks - warrior_limit)
    : n_clicks <= pro_limit
    ? min_click_bonus_pro + min_click_bonus_pro * (n_clicks - pro_limit)
    : wining_bonus;
};

/*
  This method will double each element and shuffle and return final list of random elements
*/
export const select_card_icons = (n) => {
  const array = _select_random_elements(n);
  return _shuffle_array([...array, ...array]);
};

const _COLOR_ICONS = {
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

const _getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const _shuffle_array = (array) => {
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

const _select_random_elements = (n) => {
  // Select and make a first shuffle
  const elements = _shuffle_array(Object.values(_COLOR_ICONS));
  // 1. Randomly select starting index => between 0 to a (Logic: a = array_lenth - no_of_elements_to_select+1)
  // Adding 1 on abovelogic since getRandomInt() returns value excluding supplied argument (i.e. max)
  const start_index = _getRandomInt(elements.length - n + 1);
  // 2. Select n-th index (Logic: start_index + no_of_elements_to_select -1)
  const end_index = start_index + n - 1;
  return elements.filter((elem) => {
    const index = elements.indexOf(elem);
    return index >= start_index && index <= end_index;
  });
};

export const getGameScore = (
  mode,
  result,
  no_of_matched_cards,
  time_saved = 0,
  n_clicks = 0
) => {
  const { time_bonus, points_per_matched_pair } = GAME_MODE_CONF[mode];
  const time_bonus_points = time_saved < 0 ? 0 : time_saved * time_bonus;
  const base_score = points_per_matched_pair * no_of_matched_cards;
  return !result
    ? base_score
    : base_score +
        time_bonus_points +
        _min_click_bonus_calculator(mode, n_clicks);
};

export const timeBonusDesc = (mode, time_saved = 0) => {
  const { time_bonus } = GAME_MODE_CONF[mode];
  const bonus_points = time_saved < 0 ? 0 : time_saved * time_bonus;
  return {
    points: bonus_points,
    time_saved: time_saved,
    rate: time_bonus,
  };
};

export const clickBonusDesc = (mode, n_clicks, game_result) => {
  const { wining_bonus } = GAME_MODE_CONF[mode];
  const bonus_points = _min_click_bonus_calculator(mode, n_clicks);
  return {
    points: game_result ? bonus_points : 0, // No bonus point if lost
    clicks: n_clicks,
    wining_bonus: game_result ? wining_bonus : 0, // No bonus point if lost
  };
};

export const baseScoreDesc = (mode, no_of_matched_cards) => {
  const { points_per_matched_pair } = GAME_MODE_CONF[mode];
  const base_score = points_per_matched_pair * no_of_matched_cards;
  return {
    points: base_score,
    matched_cards: no_of_matched_cards,
  };
};
