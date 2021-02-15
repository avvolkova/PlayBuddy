import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  joinEventThunk,
  closeEvent,
  getEventsThunk,
  kickUser,
} from '../../redux/action-creators/events';
import styles from './Events.module.css';

const EventPage = () => {
  const [count, setCount] = useState(0);
  const [userCreator, setUserCreator] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventsThunk());
  }, [count]);
  const history = useHistory();
  const { user, userEvents, events } = useSelector(store => store);
  const param = useParams();
  const [wasAdded, setWasAdded] = useState('');

  const event = userEvents.find(event => event._id === param.id);
  const thisEvent = events?.event?.find(event => event._id === param.id);
  const joinEvent = () => {
    if (event) {
      setWasAdded('notok');
      setTimeout(() => {
        setWasAdded('');
      }, 3000);
    } else {
      (async () => {
        await setWasAdded('ok');
        await setTimeout(() => {
          setWasAdded('');
        }, 3000);
        await dispatch(joinEventThunk({ userId: user.id, eventId: param.id }));
      })();
      history.push('/chats');
    }
  };
  return (
    <div className={styles.eventBg}>
      <div className={styles.centering}>
        <div className={styles.eventWrapper}>
          <img className={styles.thumbnailPic} src={thisEvent && thisEvent.thumbnail} alt='game' />
          <div className={styles.eventMainInfo}>
            <h1>{thisEvent && thisEvent.title}</h1>
            <div className={styles.eventDetails}>
              <span className={styles.textAddress}>Адрес: {thisEvent && thisEvent.address}</span>

              <span>
                Количество игроков: {thisEvent && thisEvent.participants.length} из{' '}
                {thisEvent && thisEvent.max_participants}
              </span>
            </div>
          </div>
        </div>
        <div className='eventBox'>
          <div className='eventDescription' style={{ marginLeft: '10px' }}>
            <h3>Описание мероприятия:</h3>
            {thisEvent && thisEvent.description}
          </div>

          <br />
          <div>
            <h3 style={{ marginLeft: '10px' }}>Участники мероприятия:</h3>
            {thisEvent &&
              thisEvent.participants.map(userr => {
                let avatarPath;
                if (userr.avatar === '/uploads/avatar.png') {
                  avatarPath = `${userr.avatar}`;
                } else {
                  avatarPath = `/uploads/${userr.avatar}`;
                }
                return (
                  <ul key={userr._id}>
                    <li className={styles.participant}>{userr.name}</li>
                    <img src={avatarPath} className={styles.ava} alt='ava' width='100px' />
                    {event && user.id === event.creator._id ? (
                      userr._id === user.id ? null : (
                        <Button style={{width: '150px', marginLeft: '1rem', marginTop: 3, padding: 0}}
                          onClick={() => {
                            setCount(pre => pre + 1);
                            kickUser(userr._id, event._id, history);
                            dispatch(getEventsThunk());
                          }}
                        >
                          выгнать
                        </Button>
                      )
                    ) : null}
                    {event && userr._id === event.creator._id ? <span> &nbsp; (организатор)</span> : null}
                  </ul>
                );
              })}
          </div>
        </div>
        <br />
        {event && user.id === event.creator._id ? (
          <Button onClick={() => closeEvent(event._id, history)} style={{width: '260px', backgroundColor: '#0dcaf0'}} >Закрыть запись</Button>
        ) : user.id ? (
          <>
            <Button
              onClick={joinEvent}
              style={{ backgroundColor: '#17a2b8', marginBottom: '20px', marginRight: '10px', width: '230px', fontSize: '.7rem' }}
            >
              Записаться на Игру!
            </Button>
              <Button
                style={{ backgroundColor: '#17a2b8', marginBottom: '20px', width: '230px', fontSize: '.7rem' }}
              onClick={() => {
                history.push('/map');
              }}
            >
              Вернуться на карту
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              history.push('/signin');
            }}
          style={{width: '250px', backgroundColor: '#0dcaf0', border: 0}}>
            Записаться на игротеку
          </Button>
        )}

        {wasAdded ? (wasAdded === 'notok' ? 'Ты уже записан :)' : 'BRAT TI ZAPISAN OT DUSHI') : ''}
      </div>
    </div>
  );
};

export default EventPage;
