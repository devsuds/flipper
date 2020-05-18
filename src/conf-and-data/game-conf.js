const GAME_MODE_CONF = {
  easy: {
    n_cards: 16,
    duration: 45 * 1000,
    points_per_matched_pair: 10,
    time_bonus: 5, // per second
    wining_bonus: 5,
    min_click_bonus_pro: 25, // per less click than limit
    min_click_bonus_warrior: 50, // per less click than limit
  },
  medium: {
    n_cards: 24,
    duration: 60 * 1000,
    points_per_matched_pair: 10,
    time_bonus: 8, // per second
    wining_bonus: 10,
    min_click_bonus_pro: 40, // per less click than limit
    min_click_bonus_warrior: 80, // per less click than limit
  },
  hard: {
    n_cards: 32,
    duration: 75 * 1000,
    points_per_matched_pair: 10,
    time_bonus: 10, // per second
    wining_bonus: 20,
    min_click_bonus_pro: 50, // per less click than limit
    min_click_bonus_warrior: 100, // per less click than limit
  },
};

export default GAME_MODE_CONF;
