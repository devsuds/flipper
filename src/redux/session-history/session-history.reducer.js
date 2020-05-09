import SessionHistoryTypes from "./session-history.types";

/*
// 1 - own, 0 - lost, -1 - abandoned
  {
      id: 1
      timestamp: "",
      game_duration: "",
      won: -1/0/1,
      n_clicks: "",
      final_score: "",
      time_bonus: "",
      min_click_bonus: "",
    }
*/
const INITIAL_STATE = {
  easy: [],
  medium: [],
  hard: [],
};

const sessionHistoryReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case SessionHistoryTypes.UPDATE_HISTORY:
      return {
        ...state,
        ...update_history(state, payload),
      };

    default:
      return state;
  }
};

const update_history = (state, history) => {
  switch (history.game_mode) {
    case "easy":
      return {
        easy: [
          ...state.easy,
          { id: state.easy.length + 1, timestamp: new Date(), ...history },
        ],
      };
    case "medium":
      return {
        medium: [
          ...state.medium,
          { id: state.easy.length + 1, timestamp: new Date(), ...history },
        ],
      };
    case "hard":
      return {
        hard: [
          ...state.hard,
          { id: state.easy.length + 1, timestamp: new Date(), ...history },
        ],
      };

    default:
      return {};
  }
};

export default sessionHistoryReducer;
