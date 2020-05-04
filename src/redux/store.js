import { createStore, applyMiddleware } from "redux";
// import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middleware = [];
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") middleware.push(logger);
export const store = createStore(rootReducer, applyMiddleware(...middleware));
// export const persistor = persistStore(store);

// export default { store, persistor };
export default { store };
