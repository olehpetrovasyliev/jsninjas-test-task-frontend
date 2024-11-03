import axios, { AxiosResponse } from "axios";
import {
  CharacterAddReqData,
  CharacterEditReqData,
  CharacterResData,
  PaginatedApiRes,
  PaginatedReqParams,
} from "./types";

const BASE_URL = "https://jsninjas-testtask-backend.onrender.com/api";

const instance = axios.create({ baseURL: BASE_URL });

export const getAllCharacters = async (
  params?: PaginatedReqParams
): Promise<AxiosResponse<PaginatedApiRes<CharacterResData>>> =>
  await instance.get(
    `/characters/?page=${params?.page || 1}&perPage=${params?.perPage || 5}`
  );

export const getCharacterById = (
  id: string
): Promise<AxiosResponse<CharacterResData>> =>
  instance.get(`/characters/${id}`);

export const addCharacter = (
  newCharacter: CharacterAddReqData
): Promise<AxiosResponse<CharacterResData>> => {
  const formData = new FormData();

  formData.append("nickname", newCharacter.nickname);
  formData.append("real_name", newCharacter.real_name);
  formData.append("origin_description", newCharacter.origin_description);
  formData.append("catch_phrase", newCharacter.catch_phrase);

  newCharacter.superpowers.forEach((superpower: string) =>
    formData.append("superpowers[]", superpower)
  );

  Array.from(newCharacter.images).forEach((image: File) =>
    formData.append("images", image)
  );

  return instance.post("/characters", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCharacter = (
  id: string,
  newCharacter: CharacterEditReqData
): Promise<AxiosResponse<CharacterResData>> => {
  const formData = new FormData();

  if (newCharacter.nickname) formData.append("nickname", newCharacter.nickname);
  if (newCharacter.real_name)
    formData.append("real_name", newCharacter.real_name);
  if (newCharacter.origin_description)
    formData.append("origin_description", newCharacter.origin_description);
  if (newCharacter.catch_phrase)
    formData.append("catch_phrase", newCharacter.catch_phrase);

  if (newCharacter.superpowers) {
    newCharacter.superpowers.forEach((superpower: string) =>
      formData.append("superpowers", superpower)
    );
  }

  if (newCharacter.images) {
    Array.from(newCharacter.images).forEach((image: File) =>
      formData.append("images", image)
    );
  }

  return instance.put(`/characters/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCharacter = (id: string) =>
  instance.delete(`/characters/${id}`);
