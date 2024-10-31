import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section>
      Welcome to characters list
      <Link to={"/characters"}>Proceed</Link>
    </section>
  );
};

export default HomePage;
