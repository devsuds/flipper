import GameActionTypes from "./game.types";

export const prepareNewGame = (payload) => ({
  type: GameActionTypes.PREPARE_GAME,
  payload: payload,
});

export const endGame = (payload) => ({
  type: GameActionTypes.END_GAME,
  payload: payload,
});

export const updateScore = (payload) => ({
  type: GameActionTypes.UPDATE_SCORE,
  payload: payload,
});

// This will get called if GameTimer component re-renders during game
// not in use right now
export const updateTimeRemaining = (payload) => ({
  type: GameActionTypes.UPDATE_TIME_REMAINING,
  payload: payload,
});
