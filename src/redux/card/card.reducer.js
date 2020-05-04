import CardActionTypes from "./card.types";

const INITIAL_STATE = {
  current_card_value: null,
  previous_card_value: null,
  current_card_id: null,
  previous_card_id: null,
  match_found: null,
  matched_cards: [],
};

const cardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CardActionTypes.CARD_CLICK:
      return { ...state, ...update_state(state, action.payload) };

    case CardActionTypes.START_OVER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

const update_state = (state, payload) => {
  const current_card_value = payload.card_value;
  const current_card_id = payload.card_id;
  const previous_card_value = state.current_card_value;
  const previous_card_id = state.current_card_id;

  // If current_card_value does not match previous_card_value then update state
  if (current_card_value !== previous_card_value) {
    return {
      current_card_value: current_card_value,
      previous_card_value: previous_card_value,
      current_card_id: current_card_id,
      previous_card_id: previous_card_id,
      match_found: null,
    };
  } else {
    /* 
      One of two scenarios can happen here.
      1. Match found
      Or,
      2. Same card clicked
    */
    const match_found = compare_card(
      current_card_value,
      previous_card_value,
      current_card_id,
      previous_card_id
    );
    let new_state_values = {};
    if (match_found) {
      new_state_values = {
        current_card_value: null,
        previous_card_value: null,
        current_card_id: null,
        previous_card_id: null,
        match_found: match_found,
        matched_cards: [...state.matched_cards, match_found],
      };
    }
    return new_state_values;
  }
};

const compare_card = (
  current_card_value,
  previous_card_value,
  current_card_id,
  previous_card_id
) => {
  return current_card_value === previous_card_value &&
    current_card_id !== previous_card_id
    ? current_card_value
    : null;
};

export default cardReducer;
