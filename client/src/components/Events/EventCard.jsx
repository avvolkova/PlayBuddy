import { Card, Button } from "react-bootstrap";
import styles from "./Events.module.css";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { leaveEvent } from '../../redux/action-creators/events'
import { useEffect } from "react";

const EventCard = () => {
  const { user, userEvents } = useSelector((store) => store);
  const history = useHistory()
  useEffect(() => {
    !user.id ? history.push('/signin') : null
  }, [])

  return (
    <>
      {userEvents.map((event) => {
        return (
          <Card key={event._id} className={styles.myCard}>
            <Card.Img className={styles.img} variant="top" src={event.thumbnail} />
            {user.id == event.creator && (
              <div className={styles.sticker}>
                <img
                  src="/sticker.png"
                  alt="sticker"
                  width="120px"
                  height="140px"
                />
                <span>Организатор</span>
              </div>
            )}
            <Card.Body
              className={
                user.id === event.creator
                  ? styles.bodyRelative
                  : styles.myCardbBody
              }
            >
              <Card.Title className={styles.cardTitle}>
                <Link to={`/event-page/${event._id}`}>{event.title}</Link>
              </Card.Title>
              <Card.Text>
                <span className={styles.eventDetails}>
                  <span>Сб, 13.02.2020</span>
                  <span style={{overflowY: "scroll", height: '100px'}}>{event.address}</span>
                </span>
              </Card.Text>
              <Button className={styles.btn} onClick={() => leaveEvent(user.id, event._id, history)}>Отписаться от события</Button>
              <Link to={`event-page/${event._id}`}>
                <button className={styles.btn}>О Событии</button>
              </Link>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default EventCard;
