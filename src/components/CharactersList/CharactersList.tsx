import { FC } from "react";
import { CharacterResData } from "../../helpers/types";
import CharacterCard from "../characterCard/CharacterCard";

type CharactersListProps = { charactersArray: CharacterResData[] };

const CharactersList: FC<CharactersListProps> = ({ charactersArray }) => {
  return (
    <ul>
      {charactersArray.map((el) => (
        <CharacterCard {...el} key={el._id} />
      ))}
    </ul>
  );
};

export default CharactersList;
