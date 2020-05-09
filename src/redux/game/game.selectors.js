import { createSelector } from "reselect";

import { baseScoreDesc, timeBonusDesc, clickBonusDesc } from "../../logic";
// Input selector
const selectGame = (state) => state.game;

// Output selectors
export const selectCardIcons = createSelector(
  [selectGame],
  (game) => game.card_icons
);

export const selectCurrentGameStat = createSelector([selectGame], (game) => ({
  base_score: baseScoreDesc(game.game_mode, game.no_of_matched_cards),
  total_score: game.game_score,
  game_result: game.game_result === 1 ? "Won" : "Lost",
  time_bonus_desc: timeBonusDesc(game.game_mode, game.time_saved),
  min_click_bonus_desc: clickBonusDesc(
    game.game_mode,
    game.click_count,
    game.game_result
  ),
}));
