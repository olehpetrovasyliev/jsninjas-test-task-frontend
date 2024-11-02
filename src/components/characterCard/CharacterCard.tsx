import { FC } from "react";
import { CharacterResData } from "../../helpers/types";
import { Link } from "react-router-dom";
import styles from "./characterCard.module.scss";

const CharacterCard: FC<CharacterResData> = ({
  _id,
  nickname,
  catch_phrase,
  images,
}) => {
  return (
    <li className={styles.characterCard}>
      <img
        src={images[0]}
        alt={`${nickname}'s photo`}
        className={styles.characterCard__image}
        width={300}
        height={300}
      />
      <h3 className={styles.characterCard__nickname}>{nickname}</h3>
      <p className={styles.characterCard__catchPhrase}>{catch_phrase}</p>
      <Link
        to={`/characters/${_id}`}
        className={styles.characterCard__viewInfo}
      >
        Viev info
      </Link>
    </li>
  );
};

export default CharacterCard;
