import GameActionTypes from "./game.types";
import { select_card_icons, GAME_MODE_CONF } from "../../logic";

const INITIAL_STATE = {
  game_mode: null,
  card_icons: null,
  game_conf: null,
  start_game: false,
  game_score: null,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameActionTypes.PREPARE_GAME:
      return {
        ...state,
        ...prepareNewGameData(action.payload),
        start_game: true,
        game_score: null,
      };
    case GameActionTypes.END_GAME:
      return {
        ...state,
        ...INITIAL_STATE,
        game_score: action.payload,
      };

    case GameActionTypes.UPDATE_SCORE:
      return {
        ...state,
        game_score: action.payload,
      };

    default:
      return state;
  }
};

const prepareNewGameData = (mode) => {
  const game_conf = GAME_MODE_CONF[mode];
  return {
    game_mode: mode,
    game_conf: game_conf,
    card_icons: select_card_icons(game_conf["n_cards"] / 2),
  };
};

export default gameReducer;
