import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCharacterThunk,
  getCharacterByIdThunk,
} from "../../helpers/redux/characters/charactersOperations";
import { AppDispatch } from "../../helpers/redux/store";
import {
  selectCurrentCharacter,
  selectLoading,
} from "../../helpers/redux/characters/charactersSelectors";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CharacterPage.module.scss";

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
    <section className={styles.characterPage}>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <>
          {" "}
          <h1 className={styles.characterPage__title}>{character?.nickname}</h1>
          <h2 className={styles.characterPage__subtitle}>
            Real Name: {character?.real_name}
          </h2>
          <p className={styles.characterPage__origin}>
            <strong>Origin:</strong> {character?.origin_description}
          </p>
          <h3>Superpowers:</h3>
          <ul className={styles.characterPage__superpowersList}>
            {character?.superpowers.map((power, index) => (
              <li key={index} className={styles.characterPage__superpower}>
                {power}
              </li>
            ))}
          </ul>
          <p className={styles.characterPage__catchPhrase}>
            <strong>Catch phrase:</strong> "{character?.catch_phrase}"
          </p>
          <div className={styles.characterPage__imagesWrapper}>
            {character?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${character?.nickname}`}
                className={styles.characterPage__img}
              />
            ))}
          </div>
          <button
            onClick={handleDelete}
            className={styles.characterPage__deleteBtn}
          >
            Delete character
          </button>
        </>
      )}
    </section>
  );
};

export default CharacterPage;
