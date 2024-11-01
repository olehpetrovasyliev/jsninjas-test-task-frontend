import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CharacterAddReqData,
  CharacterEditReqData,
  CharacterResData,
  DeletedMessage,
  PaginatedApiRes,
  PaginatedReqParams,
} from "../../types";
import { AxiosResponse } from "axios";
import {
  addCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
} from "../../api";

export const getAllCharactersThunk = createAsyncThunk<
  PaginatedApiRes<CharacterResData>,
  PaginatedReqParams
>(
  "characters/getAll",
  async (params: PaginatedReqParams, { rejectWithValue }) => {
    try {
      const res: AxiosResponse<PaginatedApiRes<CharacterResData>> =
        await getAllCharacters(params);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCharacterByIdThunk = createAsyncThunk<CharacterResData, string>(
  "characters/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res: AxiosResponse<CharacterResData> = await getCharacterById(id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCharacterThunk = createAsyncThunk<
  CharacterResData,
  CharacterAddReqData
>("characters/add", async (newCharacter, { rejectWithValue }) => {
  try {
    const res: AxiosResponse<CharacterResData> = await addCharacter(
      newCharacter
    );
    console.log(newCharacter);

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateCharacterThunk = createAsyncThunk<
  CharacterResData,
  CharacterEditReqData
>("characters/update", async (newCharacter, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<CharacterResData> = await updateCharacter(
      newCharacter
    );
    console.log(newCharacter);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteCharacterThunk = createAsyncThunk(
  "characters/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteCharacter(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
