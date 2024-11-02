import React, { FC } from "react";
import { CharacterResData } from "../../helpers/types";
import { Link } from "react-router-dom";

const CharacterCard: FC<CharacterResData> = ({
  _id,
  nickname,
  catch_phrase,
  images,
}) => {
  return (
    <li>
      <img src={images[0]} alt={`${nickname}'s photo`} />
      <h3>{nickname}</h3>
      <p>{catch_phrase}</p>
      <Link to={`/characters/${_id}`}>Viev info</Link>
    </li>
  );
};

export default CharacterCard;
