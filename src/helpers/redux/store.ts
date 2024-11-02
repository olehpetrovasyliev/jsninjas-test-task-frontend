import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./characters/charactersSlice";
import { CharacterResData } from "../types";
const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
