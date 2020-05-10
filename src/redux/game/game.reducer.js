import GameActionTypes from "./game.types";
import { select_card_icons, getGameScore } from "../../logic";
import GAME_MODE_CONF from "../../conf-and-data/game-conf";

const INITIAL_STATE = {
  game_mode: null,
  card_icons: null,
  game_conf: null,
  start_game: false,
  time_up: false,
  no_of_matched_cards: 0,
  game_score: null,
  game_result: null,
  time_saved: null,
  click_count: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameActionTypes.PREPARE_GAME:
      return {
        ...state,
        ...INITIAL_STATE,
        ...prepareNewGameData(action.payload),
        start_game: true,
      };
    case GameActionTypes.UPDATE_FINAL_SCORE:
      const { no_of_matched_cards, game_result } = action.payload;
      return {
        ...state,
        no_of_matched_cards: no_of_matched_cards,
        game_result: game_result,
        game_score: getGameScore(
          state.game_mode,
          game_result,
          no_of_matched_cards,
          state.time_saved,
          state.click_count
        ),
      };

    case GameActionTypes.END_GAME:
      return {
        ...state,
        start_game: false,
        time_up: true,
      };

    case GameActionTypes.TIME_UP:
      return {
        ...state,
        time_up: true,
      };

    case GameActionTypes.UPDATE_TIME_REMAINING:
      return {
        ...state,
        time_saved: action.payload,
      };

    case GameActionTypes.UPDATE_CLICK_COUNT:
      return {
        ...state,
        click_count: state.click_count + 1,
      };

    default:
      return state;
  }
};

const prepareNewGameData = (mode) => {
  const game_conf = GAME_MODE_CONF[mode];
  const card_icons = select_card_icons(game_conf["n_cards"] / 2);

  return {
    game_mode: mode,
    game_conf: game_conf,
    card_icons: card_icons,
  };
};

export default gameReducer;
