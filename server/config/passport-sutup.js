const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')


passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

const authenticateUser = async (req, email, password, done) => {
  if (/signin/.test(req.path)) {
    const user = await User.findOne({email})
    if (!user) return done(null, false)
    if (await bcrypt.compare(password, user.password)) return done(null, user)
    return done(null, false)
  }
  const { name, confirmPassword } = req.body
  const isEmail = await User.findOne({email : email})
  if (isEmail?.email === email) return done(null, false)
  if (password !== confirmPassword) return done(null, false)
  if (name && email && password && confirmPassword) {
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashPassword})
    return done(null, newUser)
  }
  return done(null, false)
}


passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, authenticateUser))
