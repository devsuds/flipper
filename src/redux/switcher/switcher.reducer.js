import SwitcherActionTypes from "./switcher.types";

const INITIAL_STATE = {
  show_stat: false,
  show_info: false,
};

export const switcherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SwitcherActionTypes.SHOW_MENU:
      return {
        ...state,
        // show_menu: true,
        show_stat: false,
        show_info: false,
      };
    case SwitcherActionTypes.SHOW_STAT:
      return {
        ...state,
        show_stat: action.payload,
        show_info: false,
      };
    case SwitcherActionTypes.SHOW_INFO:
      return {
        ...state,
        show_info: action.payload,
        show_stat: false,
      };

    default:
      return state;
  }
};

export default switcherReducer;
