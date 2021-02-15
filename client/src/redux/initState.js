const initState = () => {
  const obj = {
    userChats: [],
    userEvents: [],
    user: {},
    events: {},
    currentEvent: {},
    modalChat: '',
    games: {
      favGames: [],
      games: [],
    },
  };
  const fromLS = window.localStorage.getItem('store')
  return fromLS ? JSON.parse(fromLS) : obj
}

export default initState()
