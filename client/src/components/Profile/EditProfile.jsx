import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory} from "react-router-dom";
import { updateUserThunk } from "../../redux/action-creators/user";
import { Multiselect } from "multiselect-react-dropdown";
import styles from "./EditProfile.module.css";
import { useEffect } from "react";
import { getAllGamesThunk } from "../../redux/action-creators/getGames";

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((store) => store);
  const userId = useSelector((store) => store.user.id);

  useEffect(() => {
    !userId ? history.push("/signin") : null;
  }, []);

  const games = useSelector((store) => store.games.games);
  const selectedGames = useSelector((store) => store.games.favGames);

  const [inputs, setInputs] = useState({
    name: user.name,
    info: user.information,
    phone: user.phone,
    fav_games:
      Array.isArray(selectedGames) && selectedGames.length
        ? selectedGames.map((e) => (e = e._id))
        : [],
    avatar: {},
  });

  useEffect(() => {
    dispatch(getAllGamesThunk());
  }, []);

  const nameHandler = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserThunk(inputs, userId, history));
  };

  const onFileChange = (event) => {
    setInputs((prev) => {
      return { ...prev, avatar: event.target.files[0] };
    });
  };

  const selectHandler = (event) => {
    setInputs({ ...inputs, fav_games: event.map((e) => (e = e._id)) });
  };
  return (
    <div className={styles.formBg}>
      <div className={styles.centering}>
        <h1>Редактировать профиль</h1>
        <Form onSubmit={onSubmit} className={styles.form}>

          <Form.Group>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              className={styles.Group}
              onChange={nameHandler}
              type="text"
              placeholder="Введи имя"
              name="name"
              value={inputs.name}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Информация</Form.Label>
            <Form.Control
              className={styles.Group}
              onChange={nameHandler}
              type="text"
              placeholder="Расскажи немножко о себе"
              name="info"
              value={inputs.info}
              style={{ height: "100px" }}
              rows="3"
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Выбрать фото</Form.Label>
            <br />
            <Form.Control
              type="file"
              onChange={onFileChange}
              placeholder="Выбрать фото"
              name="avatar"
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              onChange={nameHandler}
              className={styles.Group}
              type="tel"
              placeholder="Введи номер телефона для связи"
              name="phone"
              value={inputs.phone}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Любимые игры</Form.Label>
            <Multiselect
              options={games}
              displayValue="title"
              onSelect={selectHandler}
              selectedValues={selectedGames}
              style={{
                option: { background: "#ced4da", color: "gray" },
                searchBox: {
                  display: "block",
                  width: "100%",
                  padding: ".375rem .75rem",
                  backgroundColor: "#fff",
                  backgroundClip: "padding-box",
                  border: "1px solid #ced4da",
                },
              }}
            />
          </Form.Group>
          <br />
          <Button variant="info" type="submit" className={styles.saveBtn}>
            Сохранить
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
