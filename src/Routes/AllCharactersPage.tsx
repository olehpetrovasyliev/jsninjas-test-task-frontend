import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharactersThunk } from "../helpers/redux/characters/charactersOperations";
import { PaginatedReqParams } from "../helpers/types";
import { AppDispatch } from "../helpers/redux/store";
import { selectAllCharacters } from "../helpers/redux/characters/charactersSelectors";
import CharactersList from "../components/CharactersList/CharactersList";
import AddCharacterLink from "../components/AddCharacterLink/AddCharacterLink";
import { getAllCharacters } from "../helpers/api";

const AllCharactersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const charactersArr = useSelector(selectAllCharacters);

  useEffect(() => {
    const params: PaginatedReqParams = {
      page: 1,
      perPage: 10,
    };

    dispatch(getAllCharactersThunk(params));
    console.log(charactersArr);
  }, [dispatch]);

  // const [charactersArr, setCharactersArr] = useState<any>([]);

  // useEffect(() => {
  //   const fetchData = async (params?: PaginatedReqParams) => {
  //     const res = await getAllCharacters(params);
  //     setCharactersArr(res.data);
  //   };
  //   fetchData({ page: 1, perPage: 5 });
  //   console.log(charactersArr);
  // }, []);

  return (
    <section>
      <CharactersList charactersArray={charactersArr} />
      <AddCharacterLink />
    </section>
  );
};

export default AllCharactersPage;
