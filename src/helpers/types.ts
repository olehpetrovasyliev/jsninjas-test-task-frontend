export interface PaginatedReqParams {
  page?: number;
  perPage?: number;
}

export interface PaginatedApiRes<T> {
  page: number;
  perPage: number;
  totalPages: number;
  results: T[];
}

export interface CharacterResData {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export interface CharacterAddReqData {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: File[];
}

export interface CharacterEditReqData {
  nickname?: string;
  real_name?: string;
  origin_description?: string;
  superpowers?: string[];
  catch_phrase?: string;
  images?: File[];
}

export interface DeletedMessage {
  message: string;
}
