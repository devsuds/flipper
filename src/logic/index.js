import GAME_MODE_CONF from "../conf-and-data/game-conf";
import { _EMOTICONS_COLLECTION } from "../conf-and-data/card-objects";

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
        min_click_bonus_warrior * (warrior_limit - n_clicks)
    : n_clicks <= pro_limit
    ? min_click_bonus_pro + min_click_bonus_pro * (pro_limit - n_clicks)
    : wining_bonus;
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
  // Shuffle array twice
  const elements = _shuffle_array(
    _shuffle_array(Object.values(_EMOTICONS_COLLECTION))
  );
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

/*
  This method will double each element and shuffle and return final list of random elements
*/
export const select_card_icons = (n) => {
  const array = _select_random_elements(n);
  return _shuffle_array([...array, ...array]);
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
