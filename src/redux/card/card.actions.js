import CardActionTypes from "./card.types";

export const cardClick = (payload) => ({
  type: CardActionTypes.CARD_CLICK,
  payload: payload,
});

export const startOver = () => ({
  type: CardActionTypes.START_OVER,
});
