import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Global';
import { theme } from './Theme';
import Burger from './components/Burger/Burger'
import Menu from './components/Menu/Menu'
import { useOnClickOutside } from './hooks';
import { useDispatch, useSelector } from "react-redux";
import { userInSessionThunk } from "../../redux/action-creators/user";
import { getTagsThunk, getGamesThunk } from '../../redux/action-creators/createEventThunk';
import { useHistory } from "react-router";
import styles from "./Main.module.css";
import './main.scss'

function MainPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      await dispatch(userInSessionThunk());
      await dispatch(getTagsThunk())
      await dispatch(getGamesThunk())
    })()
  }, [])

  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));


  return (
    <>

      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <div className='main-wrapper'>
            <h1 className={styles.appName}>Play Buddy</h1>
            <div className="dice logo pb-3">
              <div className="face" id="f1">Играй</div>
              <div className="face" id="f2">Дружи</div>
              <div className="face" id="f3">Собирай</div>
              <div className="face" id="f4">Туси</div>
              <div className="face" id="f5">Тащи</div>
              <div className="face" id="f6">Смейся</div>
            </div>
          <h4 className='say text-b'>Приложение для поиска близких по духу людей!</h4>
          </div>
          <div ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
          </div>
        </>
      </ThemeProvider>
    </>
  );
}

export default MainPage;
