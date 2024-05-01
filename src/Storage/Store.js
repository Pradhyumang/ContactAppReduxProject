import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import signUpReducer from "../Storage/Slice/signUpSlice";
import signInReducer from "../Storage/Slice/signInSlice";
import contactListReducer from "../Storage/Slice/contactListSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  // signUp: signUpReducer,
  signIn: signInReducer,
  contactApp: contactListReducer,
  // Add more reducers here as needed
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // rootR: persistedReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

const persistor = persistStore(store);

// export default store;
export { store, persistor };
