import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../pages/profile/userSlice";
import systemReducer from "../system-state/systemSlice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, systemReducer);

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    systemInfo: persistedReducer,
  },
});
export const persistor = persistStore(store);
