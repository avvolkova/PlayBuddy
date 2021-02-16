import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInSessionThunk } from "../../redux/action-creators/user";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "./Profile.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "semantic-ui-react";
import { getFavGamesThunk } from "../../redux/action-creators/getGames";

const ProfileFavGames = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const favGames = useSelector((store) => store.games.favGames);
  useEffect(() => {
    dispatch(getFavGamesThunk(user));
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        ssr
        partialVisbile
        itemClass="image-item"
      >
        {favGames.map((game) => {
          return (
            <Link to={`/game/${game._id}`} key={game._id}>
              <Image
                className={styles.favGameImage}
                draggable={false}
                src={game.thumbnail}
              />
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProfileFavGames;
