import SessionHistoryTypes from "./session-history.types";

export const updateGameHistory = (payload) => ({
  type: SessionHistoryTypes.UPDATE_HISTORY,
  payload: payload,
});
