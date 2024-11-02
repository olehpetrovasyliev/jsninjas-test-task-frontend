import { FC } from "react";
import { CharacterResData } from "../../helpers/types";
import CharacterCard from "../characterCard/CharacterCard";
import styles from "./charactersList.module.scss";

type CharactersListProps = { charactersArray: CharacterResData[] };

const CharactersList: FC<CharactersListProps> = ({ charactersArray }) => {
  return (
    <ul className={styles.charactersList}>
      {charactersArray.map((el) => (
        <CharacterCard {...el} key={el._id} />
      ))}
    </ul>
  );
};

export default CharactersList;
