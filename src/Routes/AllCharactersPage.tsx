import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharactersThunk } from "../helpers/redux/characters/charactersOperations";
import { AppDispatch } from "../helpers/redux/store";
import {
  selectAllCharacters,
  selectCharactersPage,
  selectCharactersPerPage,
  selectCharactersTotalPages,
} from "../helpers/redux/characters/charactersSelectors";
import CharactersList from "../components/CharactersList/CharactersList";
import AddCharacterLink from "../components/AddCharacterLink/AddCharacterLink";
import { setPage } from "../helpers/redux/characters/charactersSlice";

const AllCharactersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const charactersArr = useSelector(selectAllCharacters);
  const page = useSelector(selectCharactersPage);
  const perPage = useSelector(selectCharactersPerPage);
  const totalPages = useSelector(selectCharactersTotalPages);

  useEffect(() => {
    dispatch(getAllCharactersThunk({ page, perPage }));
    console.log({ charactersArr, page, perPage });
  }, [dispatch, page, perPage]);

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };
  const handlePrevPage = () => {
    dispatch(setPage(page - 1));
  };
  return (
    <section>
      <CharactersList charactersArray={charactersArr} />
      <button onClick={handlePrevPage} disabled={page === 1}>
        Prev Page
      </button>

      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next Page
      </button>
      <AddCharacterLink />
    </section>
  );
};

export default AllCharactersPage;
