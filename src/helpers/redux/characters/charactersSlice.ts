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
  characters: CharacterResData[];
  currentCharacter: CharacterResData | null;
  loading: boolean;
  error?: string | null;
}

const initialState: CharactersState = {
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllCharactersThunk.fulfilled,
        (state, action: PayloadAction<PaginatedApiRes<CharacterResData>>) => {
          state.loading = false;
          state.characters = action.payload.results;
          console.log(action.payload.results);
        }
      )
      .addCase(
        getCharacterByIdThunk.fulfilled,
        (state, action: PayloadAction<CharacterResData>) => {
          state.loading = false;
          state.currentCharacter = action.payload;
        }
      )
      .addCase(
        addCharacterThunk.fulfilled,
        (state, action: PayloadAction<CharacterResData>) => {
          state.loading = false;
          state.characters.push(action.payload);
        }
      )
      .addCase(
        updateCharacterThunk.fulfilled,
        (state, action: PayloadAction<CharacterResData>) => {
          state.loading = false;
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

export default charactersSlice.reducer;
