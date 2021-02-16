import { Link, useHistory } from 'react-router-dom';
import styles from './Profile.module.css';
import { useState, useRef } from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileFavGames from './ProfileFavGames';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useOnClickOutside } from '../Main/hooks';
import './Profile.module.css';

const Profile = () => {
  const user = useSelector(store => store.user);
  const avatar = useSelector(store => store.user.avatar);

  let avatarPath;

  if (avatar === '/uploads/avatar.png') {
    avatarPath = `${avatar}`;
  } else {
    avatarPath = `/uploads/${avatar}`;
  }

  const history = useHistory();
  useEffect(() => {
    !user.id ? history.push('/signin') : null;
  }, []);

  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.profileWrapper}>
          <Link title='Домой' to='/'>
            <img src='home.svg' alt='home' className={styles.hamburger} />
          </Link>
          <img src={avatarPath} alt='avatar' className={styles.avatar} />
          <Link to='/edit'>
            <img title='Настройки' src='settings.svg' alt='setting' className={styles.settings} />
          </Link>
        </div>

        <ProfileInfo />
        <div>
          <>
            <Link to='/events'>
              <button
                className='btn btn-outline-info btn-lg'
                style={{
                  width: '200px',
                  padding: '6px',
                  fontSize: '22px',
                  marginRight: '20px',
                  color: 'white',
                }}
              >
                Мои События
              </button>
            </Link>

            <Link to='/chats'>
              <button
                className='btn btn-outline-info btn-sm'
                style={{ width: '200px', padding: '6px', fontSize: '22px', color: 'white' }}
              >
                Мои Чаты
              </button>
            </Link>
          </>
        </div>

        <div className={styles.bottom}>
          {user.information ? (
            <div>
              {' '}
              <h2 style={{ color: '#fcf876', fontSize: '1.3rem' }}>Личная информация</h2>
              <p>{user?.information} </p>
            </div>
          ) : null}
          {user.phone ? (
            <div>
              <h2 style={{ color: '#fcf876', fontSize: '1.3rem' }}>Со мной можно связаться по номеру</h2>
              <p>{user?.phone} </p>
            </div>
          ) : null}
          <br />

          <h1 style={{ color: '#fcf876', fontSize: '1.3rem', textShadow: '1px 1px 2px #e7e7de' }}>
            Любимые Игры
          </h1>
          {user.fav_games ? <ProfileFavGames /> : <div>Пока не выбрано ни одной любимой игры</div>}
        </div>
      </div>
    </div>
  );
};
export default Profile;
