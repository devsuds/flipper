import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cardReducer from "./card/card.reducer";
import gameReducer from "./game/game.reducer";
import sessionHistoryReducer from "./session-history/session-history.reducer";
import switcherReducer from "./switcher/switcher.reducer";

const persistConfig = {
  key: "root-07121987",
  storage,
  whitelist: ["history", "game"],
};

const rootReducer = combineReducers({
  card: cardReducer,
  game: gameReducer,
  history: sessionHistoryReducer,
  switcher: switcherReducer,
});

export default persistReducer(persistConfig, rootReducer);
// export default rootReducer;
