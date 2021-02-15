import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Main from './components/Main/Main'
import CreateEventForm from "./components/Create-event-form/CreateEventForm"
import EventMap from "./components/EventMap/EventMap"
import Signin from "./components/Signin/SignIn"
import SignUp from "./components/Signup/SignUp"
import Events from "./components/Events/Events"
import EventPage from "./components/Events/EventPage.jsx"
import Game from './components/Game/Game';
import Profile from "./components/Profile/Profile.jsx"
import EditProfile from "./components/Profile/EditProfile.jsx"
import Chat from "./components/Сhat/Chat"
import './index.css'
import React from "react"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/events" exact component={Events} />
        <Route path="/chats" exact component={Chat} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/edit" exact component={EditProfile} />
        <Route path="/create-event" exact component={CreateEventForm} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/game" exact component={Game} />
        <Route path="/game/:id" exact component={Game} />
        <Route path="/map" exact component={EventMap} />
        <Route exact path='/event-page/:id' component={EventPage} />
      </Switch>
    </Router>
  )
}

export default App;


