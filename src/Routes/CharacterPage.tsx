import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCharacterThunk,
  getCharacterByIdThunk,
} from "../helpers/redux/characters/charactersOperations";
import { AppDispatch } from "../helpers/redux/store";
import {
  selectCurrentCharacter,
  selectLoading,
} from "../helpers/redux/characters/charactersSelectors";
import { Swiper, SwiperSlide } from "swiper/react";

const CharacterPage = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const character = useSelector(selectCurrentCharacter);
  const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getCharacterByIdThunk(id));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    if (id) {
      dispatch(deleteCharacterThunk(id));
    }
    navigate("/characters");
  };

  return (
    <section>
      {isLoading ? (
        <h1>loading</h1>
      ) : character ? (
        <>
          {" "}
          <h1>{character.nickname}</h1>
          <h2>Real Name: {character.real_name}</h2>
          <p>
            <strong>Origin:</strong> {character.origin_description}
          </p>
          <h3>Superpowers:</h3>
          <ul>
            {character.superpowers.map((power, index) => (
              <li key={index}>{power}</li>
            ))}
          </ul>
          <p>
            <strong>Catchphrase:</strong> "{character.catch_phrase}"
          </p>
          <h3>Images:</h3>
          <Swiper>
            {character.images.map((image, index) => (
              <SwiperSlide>
                <img key={index} src={image} alt={`${character.nickname}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button onClick={handleDelete}>Delete character</button>
        </>
      ) : (
        <h1>Character with id {id} not exists</h1>
      )}
    </section>
  );
};

export default CharacterPage;
