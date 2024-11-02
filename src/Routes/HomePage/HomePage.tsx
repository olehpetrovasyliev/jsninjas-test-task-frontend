import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <section className={styles.homepage}>
      <p className={styles.homepage__welcomeText}>Welcome to characters list</p>
      <Link to={"/characters"} className={styles.homepage__proceedButton}>
        Proceed
      </Link>
    </section>
  );
};

export default HomePage;
