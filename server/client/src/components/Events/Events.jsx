import styles from "./Events.module.css";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import { CardGroup } from "react-bootstrap";


const Events = () => {

  return (
    <div>
      <div>
        <Link title="Домой" to="/">
          <img src="home.svg" className={styles.hamburger} />
        </Link>
        <h1 className={styles.title}>Мои События</h1>
        <div className={styles.flex}>
          <CardGroup className={styles.myGroup}>
            <EventCard />
          </CardGroup>
          <hr />
          <Link to="/create-event" >
            <button className={styles.btnLarge} type="button">
              Создать новое событие
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;
