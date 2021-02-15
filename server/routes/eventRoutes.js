const { Router } = require('express')
const router = Router()
const Chat = require('../models/chat');
const Event = require('../models/event');
const Game = require('../models/game')
const User = require('../models/user');
const Tags = require('../models/tag')
const fetch = require('node-fetch')


router.post('/', async (req, res) => {
  const { title, description, max_participants, address, game, coordinates, category, thumbnail, time } = req.body
  const newCoordinates = coordinates.split(' ').map(el => +el).reverse()
  const fetchToYandex = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=51ad9d93-9100-4ffa-8ebf-138a17d2a225&format=json&geocode=${coordinates}`)
  const correctAddress = await fetchToYandex.json()
  const resultAddress = correctAddress?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
  const newChat = new Chat({ messages: [], eventTitle: title });
  const newEvent = new Event({ title, description, category, max_participants, chat: newChat._id, creator: req.user._id, participants: [req.user._id], address:resultAddress, game, coordinates: newCoordinates, thumbnail, time });
  const user = await User.findById(req.user._id)
  await newChat.save();
  await newEvent.save();
  user.userEvents.push(newEvent._id)
  user.userChats.push(newChat._id)
  await user.save()
  res.json([newChat, newEvent]);
})

router.get('/', async (req, res) => {
  const allEvent = await Event.find({ visible: true }).populate('participants')
    .populate('game')
  res.json(allEvent)
})

router.get('/tags', async (req, res) => {
  const tags = await Tags.find()
  res.json({ status: 200, tags })
})

router.get("/all-games", async (req, res) => {
  const games = await Game.find();
  res.json({ status: 200, games });
});

router.post("/fav-games", async (req, res) => {
  const currUser = await User.findById(req.body.id).populate('fav_games')
  res.json({ status: 200, favGames: currUser.fav_games });
});

router.get('/games/', async (req, res) => {
  const games = await Game.find()
  res.json({ status: 200, games })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const currentEvent = await Event.findById(id).populate('game')
  res.json(currentEvent)
})

router.post('/join', async (req, res) => {
  const { userId, eventId } = req.body;
  const event = await Event.findById(eventId)
  const user = await User.findById(userId);
  user.userEvents = [...user.userEvents, eventId];
  user.userChats = [...user.userChats, event.chat];
  event.participants = [...event.participants, userId];
  await user.save();
  await event.save();
  const chat = await Chat.findById(event.chat).populate('messages')
  res.json({ chat, event});
})

router.get('/close/:eventId', async (req, res) => {
  const { eventId } = req.params
  await Event.findByIdAndUpdate(eventId, { visible: false })
  res.json({ status: 200 })
})

router.post('/kick-user', async (req, res) => {
  const { userId, eventId } = req.body
  const user = await User.findById(userId)
  const event = await Event.findById(eventId)
  user.userEvents = user.userEvents.filter(event => String(event) !== eventId)
  event.participants = event.participants.filter(user => String(user) !== userId)
  user.userChats = user.userChats.filter(chat => String(chat) !== String(event.chat));
  await user.save()
  await event.save()

  res.json({ status: 200 })
})


module.exports = router
