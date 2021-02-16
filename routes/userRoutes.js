const { Router } = require('express')
const router = Router()
const passport = require('passport')
const User = require('../models/user')
const Chat = require('../models/chat')


router.post('/signin', passport.authenticate('local', {
    failureRedirect: '/user/failure/signup'
}), async (req, res) => {
  req.session.user = { id: req.user._id, name: req.user.name }
  res.json({ status: 200, user: req.session.user })
})

router.post('/signup', passport.authenticate('local',{
  failureRedirect: '/user/failure/signup'
}), async (req, res) => {
  req.session.user = { id: req.user._id, name: req.user.name }
  res.json({ status: 200, user: req.session.user })
})

router.get('/in-session', async (req, res) => {
  if (req.session.user) {
    const user = await User.findById(req.session.user.id).populate({ path: 'userEvents', populate: { path: 'creator' } })
    let chats = await Chat.find({ '_id': { $in: user.userChats } }).populate({ path: 'messages', populate: { path: 'user_ref' } });
    res.json({ user: {...req.session.user, fav_games:user.fav_games, avatar:user.avatar, phone: user?.phone, information: user?.information}, userEvents: user.userEvents, userChats: chats })
  } else {
    res.json({ user: null })
  }
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  req.session.user = { id: req.user._id, name: req.user.name }
  res.redirect('http://localhost:3000/')
})

router.get('/auth/vkontakte', passport.authenticate('vkontakte'))

router.get('/vk/callback',
  passport.authenticate('vkontakte'), (req, res) => {
    req.session.user = { id: req.user._id, name: req.user.name }
    res.redirect('http://localhost:3000/')
  }
)

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('sid')
  res.sendStatus(200);
})

router.get('/failure/signup', async (req, res) => {
  res.json({status: 400, message: 'Не верные данные'})
})


module.exports = router
