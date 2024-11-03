import { FC } from "react";
import { Link } from "react-router-dom";
type AddCharacterLinkProps = {
  className?: string;
};
const AddCharacterLink: FC<AddCharacterLinkProps> = ({ className }) => {
  return (
    <Link to="/addCharacter" className={className}>
      + add new
    </Link>
  );
};

export default AddCharacterLink;
