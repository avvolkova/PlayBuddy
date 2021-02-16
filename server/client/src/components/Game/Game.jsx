import styles from "./Game.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Game() {
  const { id } = useParams();
  const game = useSelector((store) => store.games.favGames).filter(
    (game) => game._id === id
  )[0];
  let currGameTags = game.tags;
  const tagsInReducer = useSelector((store) => store.events.tags);
  const populatedTags = currGameTags.map(
    (tag) => (tag = tagsInReducer.find((item) => item._id === tag))
  );

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getTagsThunk());
  }, []);

  return (
    <div className={styles.bg}>
      <div className={styles.centering}>
        <h1 className={styles.gameName}>{game.title}</h1>
        <div className={styles.gameInfo}>
          <div className={styles.gameLeft}>
            <div className={styles.gamePhoto}>
              <img src={game.img} alt={game.title} />
            </div>
            <div className={styles.gameLink}>
              <a href={game.rules} target='_blank'>Правила можно почитать тут</a>
            </div>
            <div className={styles.gameDetailes}>
              <div >
                от {game.min_players} до {game.max_players} игроков
              </div>
              <div >
                партия от {game.min_playtime} минут
              </div>
            </div>
          </div>
          <div className={styles.gameRight}>
            <div className={styles.gameDescription}>{game.description}</div>
            <div className={styles.gameTags}>
              {populatedTags.map((tag) => {
                return (
                  <div
                    key={tag._id}
                    className={styles.span}
                    title={tag.description}
                  >
                    {tag.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
