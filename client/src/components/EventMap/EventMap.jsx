import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInSessionThunk } from '../../redux/action-creators/user';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';
import './eventMap.css';
import { filterEvents, getCurrentEventThunk, getEventsThunk } from '../../redux/action-creators/events';
import { useHistory } from 'react-router';
import Checkbox from '../Checkbox/Checkbox';
import '../EventMap/eventMap.css'
import { Link } from "react-router-dom";
import styles from '../Profile/Profile.module.css';

const EventMap = () => {
  const [category, setCategory] = useState([])
  const key = '51ad9d93-9100-4ffa-8ebf-138a17d2a225';
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, events } = useSelector(store => store);
  const [eventState, setEventState] = useState(events.event)
  const currentEvent = useSelector(store => store.currentEvent);
  const filterEvent = useSelector(items => items.events.filterEvent)
  const redirectOnEventPage = id => {
    history.push(`/event-page/${id}`);
  };
  useEffect(() => {
    (async () => {
      await dispatch(userInSessionThunk());
      await dispatch(getEventsThunk());
    })();
  }, []);

  useEffect(() => {
    if (category.length) {
      dispatch(filterEvents(category))
    }
  }, [category])

  useEffect(() => {
    if (category.length) {
      setEventState(filterEvent)
    }
  }, [filterEvent])

  const clickHandler = id => {
    dispatch(getCurrentEventThunk(id));
  };
  const sortByCheckbox = (event) => {
    event.target.value = !event.target.value
    if (event.target.checked) {
      setCategory(prev => [...prev, event.target.dataset.id])
    } else {
      setCategory(prev => {
        return prev.filter(el => el !== event.target.dataset.id)
      })
      setEventState(events.event)
    }
  }
  return (
 <div className="bg">
      <div className="eventMap wrapper">
      <Link title='Домой' to='/'>
            <img src='home.svg' className={styles.hamburger} />
      </Link>
      <div className="container">
        <div className="info">
          {user ? (
            <div className="current-info">
              {currentEvent._id ? (
                <>
                  <h3>{currentEvent.game.title}</h3>
                  <h5>Описание события:  {currentEvent.description}</h5>
                  <span className='address'>Адрес:{currentEvent.address}</span>
                  <button
                    onClick={() => redirectOnEventPage(currentEvent._id)}
                      className="btn btn-info"
                      style={{color: '#41444b', padding: '10px', width: '160px'}}
                  >Подробнее

                  </button>
                </>
              ) : (
                <p>Выбери событие</p>
              )}
            </div>
          ) : (
            <h1>Давай зарегистрируемся?</h1>
          )}
        </div>
        <div className="y-wrapper">
          <Checkbox sortByCheckbox={sortByCheckbox} />
          <YMaps query={{ ns: "use-load-option", apikey: key }}>
            <Map
              defaultState={{
                center: [55.75, 37.57],
                zoom: 10,
                controls: ['zoomControl', 'fullscreenControl'],
              }}
              modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
              className='map'
              instanceRef={ref => {
                ref && ref.behaviors.disable('scrollZoom');
              }}
            >
              <Clusterer options={{ groupByCoordinates: false }}>
                {eventState &&
                  eventState.map(event => {
                    return (
                      <div key={event._id}>
                        <Placemark
                          onClick={() => clickHandler(event._id)}
                          geometry={event.coordinates}
                          options={{
                            iconLayout: 'default#image',
                            iconImageHref: `http://localhost:3001${event.thumbnail}`,
                            iconImageSize: [40, 40],
                          }}
                        />
                      </div>
                    );
                  })}
              </Clusterer>
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
 </div>
  );
};

export default EventMap;
//http://localhost:3000/event-page/60264e1bf8ce1f363421e565
