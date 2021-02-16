const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL
  },
  async (accessToken, refreshToken, profile, done) => {
    const currentUser = await User.findOne({googleID: profile.id})
    if (currentUser) {
      done(null, currentUser)
    } else {
      const user = await User.create({name: profile.displayName, googleID: profile.id})
      done(null, user)
    }
  }
))
