import { RootState } from "../store";

export const selectAllCharacters = (state: RootState) =>
  state.characters.characters;

export const selectCurrentCharacter = (state: RootState) =>
  state.characters.currentCharacter;

export const selectCharactersPage = (state: RootState) => state.characters.page;
export const selectCharactersPerPage = (state: RootState) =>
  state.characters.perPage;
export const selectCharactersTotalPages = (state: RootState) =>
  state.characters.totalPages;

export const selectLoading = (state: RootState) => state.characters.loading;

export const selectError = (state: RootState) => state.characters.error;
