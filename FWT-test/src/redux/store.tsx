import { combineReducers, configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./slice/imagesSlice";
import authorsReducer from "./slice/authorsSlice";
import locationsReducer from "./slice/locationsSlice";
import searchReducer from './slice/searchSlice'

const rootReducer = combineReducers({
  imagesReducer,
  authorsReducer,
  locationsReducer,
  searchReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
