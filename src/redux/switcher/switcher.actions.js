import SwitcherActionTypes from "./switcher.types";

export const showInfo = (payload) => ({
  type: SwitcherActionTypes.SHOW_INFO,
  payload: payload,
});

export const showStat = (payload) => ({
  type: SwitcherActionTypes.SHOW_STAT,
  payload: payload,
});
