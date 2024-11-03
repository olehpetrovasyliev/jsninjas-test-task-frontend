import { createSlice, PayloadAction, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllCharactersThunk,
  getCharacterByIdThunk,
  addCharacterThunk,
  updateCharacterThunk,
  deleteCharacterThunk,
} from "./charactersOperations";
import { CharacterResData, PaginatedApiRes } from "../../types";

interface CharactersState {
  page: number;
  perPage: number;
  totalPages: number;
  characters: CharacterResData[];
  currentCharacter: CharacterResData | null;
  loading: boolean;
  error?: string | null;
}

const initialState: CharactersState = {
  page: 1,
  perPage: 5,
  totalPages: 2,
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
    loadMore(state, action: PayloadAction<number>) {
      state.perPage += action.payload;
    },
    resetPagination(state) {
      state.page = 1;
      state.perPage = 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllCharactersThunk.fulfilled,
        (state, action: PayloadAction<PaginatedApiRes<CharacterResData>>) => {
          state.loading = false;
          state.error = null;

          state.characters = action.payload.results;
          state.perPage = action.payload.perPage;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        getCharacterByIdThunk.fulfilled,
        (state, action: PayloadAction<CharacterResData>) => {
          state.loading = false;
          state.error = null;

          state.currentCharacter = action.payload;
        }
      )
      .addCase(
        addCharacterThunk.fulfilled,
        (state, action: PayloadAction<CharacterResData>) => {
          state.loading = false;
          state.error = null;
          if (
            state.characters.length < state.perPage &&
            state.page === state.totalPages
          ) {
            state.characters.push(action.payload);
          } else if (
            state.characters.length === state.perPage &&
            state.page === state.totalPages
          ) {
            state.totalPages += 1;
          }
        }
      )
      .addCase(
        updateCharacterThunk.fulfilled,
        (state, action: PayloadAction<CharacterResData>) => {
          state.loading = false;
          state.error = null;

          const index = state.characters.findIndex(
            (character) => character._id === action.payload._id
          );
          if (index !== -1) {
            state.characters[index] = action.payload;
          }
        }
      )
      .addCase(deleteCharacterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = state.characters.filter(
          (character) => character._id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(
          getAllCharactersThunk.pending,
          getCharacterByIdThunk.pending,
          addCharacterThunk.pending,
          updateCharacterThunk.pending,
          deleteCharacterThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllCharactersThunk.rejected,
          getCharacterByIdThunk.rejected,
          addCharacterThunk.rejected,
          updateCharacterThunk.rejected,
          deleteCharacterThunk.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});
export const { setPage, setPerPage, loadMore, resetPagination } =
  charactersSlice.actions;

export default charactersSlice.reducer;
