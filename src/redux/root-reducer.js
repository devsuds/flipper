import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import cardReducer from "./card/card.reducer";
import gameReducer from "./game/game.reducer";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["card", "game"],
// };

const rootReducer = combineReducers({
  card: cardReducer,
  game: gameReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
