import GameActionTypes from "./game.types";

export const prepareNewGame = (payload) => ({
  type: GameActionTypes.PREPARE_GAME,
  payload: payload,
});

export const updateFinalScore = (payload) => ({
  type: GameActionTypes.UPDATE_FINAL_SCORE,
  payload: payload,
});

export const endGame = () => ({
  type: GameActionTypes.END_GAME,
});

export const timeUp = () => ({
  type: GameActionTypes.TIME_UP,
});

export const updateTimeRemaining = (payload) => ({
  type: GameActionTypes.UPDATE_TIME_REMAINING,
  payload: payload,
});

export const updateClickCount = () => ({
  type: GameActionTypes.UPDATE_CLICK_COUNT,
});
