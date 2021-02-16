import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers/rootReducer'
import { Provider } from 'react-redux'
import initState  from './redux/initState'
import thunk from "redux-thunk";


const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
  window.localStorage.setItem('store', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, document.getElementById('root'));
