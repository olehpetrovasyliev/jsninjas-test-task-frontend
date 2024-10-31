import { RootState } from "../store";

export const selectAllCharacters = (state: RootState) =>
  state.characters.characters;

export const selectCurrentCharacter = (state: RootState) =>
  state.characters.currentCharacter;

export const selectLoading = (state: RootState): boolean =>
  state.characters.loading;

export const selectError = (state: RootState) => state.characters.error;
