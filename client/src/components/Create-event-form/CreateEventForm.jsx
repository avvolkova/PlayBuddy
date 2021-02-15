import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createEventThunk } from "../../redux/action-creators/createEventThunk";
import styles from "./Create-event-form.module.css";

const CreateEventForm = () => {
  const [value, onChange] = useState(new Date("2021-02-13"));
  const [form, setForm] = useState({
    title: "",
    address: "",
    category: "",
    game: "",
    description: "",
    max_participants: 1,
    coordinates: "",
    thumbnail: "",
    time: value,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { tags, games } = useSelector((store) => store.events);
  const [gameValue, setGameValue] = useState(games);

  const tagHandler = (event) => {
    inputHandler(event);
    setGameValue((pre) =>
      games.filter((game) => game.tags.includes(event.target.value))
    );
  };

  const inputHandler = async (event) => {
    let street;
    if (event.target.name === "address") {
      street = event.target.value;
      const req = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=51ad9d93-9100-4ffa-8ebf-138a17d2a225&format=json&geocode=${street}`
      );
      const res = await req.json();
      const coordinates =
        res?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point
          ?.pos;
      setForm((prev) => {
        return {
          ...prev,
          coordinates,
          [event.target.name]: event.target.value,
        };
      });
    } else if (event.target.name === "game") {
      setForm((prev) => {
        let currentThumbnail;
        currentThumbnail =
          games && games.find((el) => el._id === event.target.value)?.thumbnail;
        return {
          ...prev,
          thumbnail: currentThumbnail,
          [event.target.name]: event.target.value,
        };
      });
    } else {
      setForm((prev) => {
        return { ...prev, [event.target.name]: event.target.value };
      });
    }
  };
  const createEventHandler = async (event) => {
    event.preventDefault();
    await dispatch(createEventThunk(form, history));
  };

  return (
    <div className={styles.formBg}>
      <div className={styles.centering}>
        <div className="container">
          <h1 className="mb-4">Создание события</h1>
          <form onSubmit={createEventHandler}>
            <div className="mb-3">
              <label htmlFor="event" className="form-label">
                Название события
              </label>
              <input
                onChange={inputHandler}
                name="title"
                type="text"
                className="form-control"
                id="event"
                aria-describedby="emailHelp"
                placeholder="Введи название события"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Адрес
              </label>
              <input
                onChange={inputHandler}
                name="address"
                type="text"
                className="form-control"
                id="address"
                placeholder="Введи корректный адрес"
              />
            </div>
            <select
              onChange={tagHandler}
              name="category"
              className="mb-3 form-select"
            >
              <option selected>Категория игры</option>
              {tags &&
                tags.map((tag) => {
                  return (
                    <option key={tags._id} value={tag._id}>
                      {tag.title}
                    </option>
                  );
                })}
            </select>
            <select
              onChange={inputHandler}
              name="game"
              className="mb-3 form-select"
            >
              <option selected>Название игры</option>
              {gameValue &&
                gameValue.map((game) => {
                  return (
                    <option key={game._id} value={game._id}>
                      {game.title}
                    </option>
                  );
                })}
            </select>
            <div className="mb-3">
              <label htmlFor="desc">Описание события</label>
              <textarea
                onChange={inputHandler}
                name="description"
                className="form-control"
                id="desc"
                placeholder="Во что будем играть? Кого готов позвать? Нужно ли заранее почитать правила?"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Ожидаемое количество игроков
              </label>
              <input
                onChange={inputHandler}
                name="max_participants"
                type="number"
                className="form-control"
                id="amount"
                placeholder="Введи количество от 2 и более человек"
              />
            </div>

            {/*       <DatePicker
              className={styles.picker}
              onChange={onChange}
              value={value}
              format={"yy-MM-dd"}
              monthPlaceholder="mm"
              minDate={new Date()}
            /> */}

            {/* player's level */}
            {/*  <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="beginner">Приглашаю начинающих игроков</label>
          <input onChange={inputHandler} name='beginner' className="form-check-input" type="checkbox" value="" id="beginner" />
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="advanced">...продвинутых игроков</label>
          <input onChange={inputHandler} name='advanced' className="form-check-input" type="checkbox" value="" id="advanced" />
        </div> */}

            <button type="submit" className="btn btn-primary" style={{width: '200px', marginBottom: '25px'}}>
              Идём играть!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
