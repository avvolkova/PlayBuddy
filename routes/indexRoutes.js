const { Router } = require("express");
const User = require("../models/user");
const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({

  destination: './public/uploads/',
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get("/", (req, res) => {
  res.send("Server");
});

router.post("/edit", upload.single('avatar'), async (req, res) => {
  const { name, info, phone, fav_games, userId } = req.body;
  req.session.user = { ...req.session.user, name, userId, fav_games, avatar: req.file.filename };
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name,
        information: info,
        phone,
        fav_games,
        avatar: req.file.filename
      },
    },
    { new: true }
  );
  res.json(user);
});

module.exports = router;
