require('dotenv').config()
const passport = require('passport')
const VKontakteStrategy = require('passport-vkontakte').Strategy
const User = require('../models/user')


passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(function (user) { done(null, user)})
    .catch(done);
})

passport.use(new VKontakteStrategy(
  {
    clientID:     process.env.VKONTAKTE_APP_ID,
    clientSecret: process.env.VKONTAKTE_APP_SECRET,
    callbackURL:  process.env.CALLBACKURLVK,
  },
  async function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
    let user = await User.findOne({ vkId: profile.id })
    if (!user) {
      user = await User.create({name: profile.displayName, vkId: profile.id})
    }
    done(null, user)
  }
));


