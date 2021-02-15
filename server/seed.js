const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://Tim:vIxGjX0g290J9TeR@abba.he1uc.mongodb.net/abba?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
const Level = require("./models/level");
const Tag = require("./models/tag");
const Place = require("./models/place");
const Game = require("./models/game");
const User = require("./models/user");

const titles = ["Начинающие игроки", "Опытные игроки"];
const tags = [
  "Классика",
  "Подходит для детей",
  "Карточная",
  "ККИ",
  "Словесная",
  "На целый день",
  "Ролевая",
  "На скорость",
  "Детективная",
  "Мафия",
"С полем и фишками",
];
const tagDescr = [
  "Старые-добрые шашки, шахматы, нарды и иже с ними",
  "Семейные и детские настольные игры",
  "Uno, Свинтус, Манчкин и.т.д",
  "Коллекционные карточные игры типа Magic the gathering",
  "Игры на загадывание и объяснение слов: Alias, Codenames и.т.д",
  "Продолжительность партии от 2 часов и выше",
  "Live action role-playing game, LARP) — разновидность ролевой игры, в которой участники отыгрывают свою роль и вместе с другими игроками создают какую-то воображаемую ситуацию",
  "Доббль, Медвед и.т.д",
  "Кооперативные или индивидуальные игры в детективном жанре",
  "Город засыпает...",
  "Ну, собственно, этим всё сказано"
];
/* const place = {
  name: "Антикафе 'Зеленая дверь'",
}; */

const games = [
  /*   {
    title: "Взрывные котята",
    rules: "https://www.mosigra.ru/Face/Show/vzryvnye_kotyata/rules",
    min_players: 2,
    max_players: 5,
    min_playtime: 15,
    min_age: 10,
    img: "/gameImg/Взрывные котята.png",
    thumbnail: "/gameThumbs/Взрывные котята_.jpg",
    description:
      "Взрывные котята» — это карточная игра, дико популярная на «Кикстартере». Она там собрала почти девять миллионов долларов — для настольных игр это рекорд. Все в неё просто влюбились. Кому-то эта игра напоминает «Уно», кому-то русскую рулетку. Вы тянете карты из колоды, в которой среди прочих карт замешаны взрывные котята — они сразу выкидывают вас из игры. Все остальные карты помогают избежать встречи с опасными котятами и подставить под удар друзей. Вам нужно остаться в игре последним выжившим",
  }, {
    title: "Uno",
    rules: "https://tashkent.mosigra.ru/Face/Show/uno/rules",
    min_players: 2,
    max_players: 10,
    min_playtime: 10,
    img: "/gameImg/Уно.jpg",
    thumbnail:
      "/gameThumbs/Уно_.png",
    min_age: 7,
    description:
      "У вас есть колода карт, из которой раздаётся по 7 каждому из игроков. Затем на стол кладётся ещё одна карта, с которой и начинается игра. Задача — сбросить все свои карты. В свой ход вы имеете право выкладывать на стол карту, которая по значению (картинке) или цвету совпадает с верхней на игровом столе (как в «американском дураке» или «101»). Есть и специальные карты, которые создают различные эффекты. Когда у вас на руке остаётся только одна карта, нужно обязательно крикнуть «Уно» — если же это крикнут ваши соперники, то вы будете вынуждены взять ещё карт.",

      {
        title: "Шахматы",
        rules:
        "https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0_%D1%88%D0%B0%D1%85%D0%BC%D0%B0%D1%82",
        min_players: 2,
        max_players: 10,
        min_playtime: 25,
        img: "/gameImg/chess.jpg",
        thumbnail: "/gameThumbs/chess_.png",
        min_age: 10,
        description: "Старые-добрые 64 клетки",
      },
      {
        title: "Имаджинариум",
        rules: "https://www.mosigra.ru/Face/Show/imadjinarium/rules",
        min_players: 4,
        max_players: 7,
        min_playtime: 30,
        min_age: 12,
        img: "/gameImg/imaginarium.jpg",
        thumbnail: "/gameThumbs/imaginarium_.png",
        description:
        "«Имаджинариум» — это очень простая и очень интересная игра, в которой нужно придумывать ассоциации к необычным картинкам из коробки. Картинки рисовали сумасшедшие художники, поэтому ассоциаций — от самых простых, вроде «любовь», «зима», «принципиальность», до самых сложных и безумных, в духе «Всё правильно сделал», «Где драма? Опять нет драмы!», «Чак-чак! Беги быстрее!», может быть просто море.",
      },
      {
        title: "Dungeons & Dragons",
        rules: "http://hobbygames.by/download/rules/DC_rulebook_RUS.pdf",
        min_players: 3,
        max_players: 8,
        min_playtime: 180,
        img: "/gameImg/dnd.png",
      thumbnail: "/gameThumbs/dnd_.png",
      min_age: 12,
      description:
      "Dungeons and Dragons — это чрезвычайно известная на западе ролевая система. Под системой понимается свод правил, описывающий взаимодействия персонажей в вымышленном мире. И требуется она для того, чтобы четверо-пятеро друзей смогли собраться и поучаствовать в эпическом фэнтези-приключении. Один из игроков становится ведущим, Dungeon Master-ом. Он должен заранее подготовить сценарий приключения и хорошо продумать место, где оно будет происходить. Остальные игроки создают себе по одному персонажу, продумывая им биографию, внешний вид и задавая игровые характеристики. Когда с подготовкой будет покончено, ведущий начнет рассказывать историю, а игроки — описывать свои действия в ней. Мастер обрисовывает игрокам обстановку, говорит от имени персонажей в этом мире, рисует карты подземелий. Игроки же двигают фигурки героев, и говорят от их имени, пытаясь вжиться в шкуру своих персонажей.",
    },
    {
      title: "Активити",
      rules: "https://www.mosigra.ru/Face/Show/activity/rules/",
      min_players: 3,
      max_players: 16,
      min_playtime: 40,
      img: "/gameImg/activity.jpg",
      thumbnail: "/gameThumbs/activity_.jpeg",
      min_age: 12,
      description:
      "Activity — невероятно весёлая игра, любимая во всём мире. Уже больше 25 лет люди рисуют, говорят и машут руками, чтобы за минуту объяснить слова своей команде и победить. Эта коробка — самый классический, оригинальный вариант игры Активити. Универсальный подарок для взрослых и подростков, обязательный житель вашей полки с настольными играми — всё это про Активити Original! Объясняйте слова в отведённое время, зарабатывайте баллы для своей команды и выигрывайте.",
    },*/
    {
      title: "Монополия",
      rules: "https://www.mosigra.ru/Face/Show/monopoly/rules",
      min_players: 2,
      max_players: 6,
      min_playtime: 60,
      img: "/gameImg/monopoly.jpg",
      thumbnail: "/gameThumbs/monopoly_.png",
      min_age: 8,
      description:
      "Просто попросите своих знакомых перечислить известные им настольные игры: наверняка, именно «Монополия» будет в начале этого списка. «Монополия» известна практически каждому и, казалось бы, не нуждается в дальнейших представлениях. Один и тот же классический принцип игры, не меняющийся уже десятилетиями, простота обучения, интересность и большие возможности для командной игры — казалось бы, что ещё нужно, чтобы сделать хороший подарок, отлично провести вечер или поиграть в офисе?",
    },
    /*
  {
    rules: "https://www.mosigra.ru/Face/Show/codenames/rules/",
    title: "Кодовые имена",
    min_players: 2,
    max_players: 8,
    min_playtime: 15,
    img: "/gameImg/codenames.jpg",
    thumbnail: "/gameThumbs/codenames_.png",
    min_age: 10,
    description:
    "Кодовые имена — это командная игра, в которой капитаны шпионских организаций помогают своим отыскать всех тайных агентов. Она необычная и достаточно простая, поэтому затягивает на несколько часов, хотя можно успеть и за тридцать минут. Всё зависит от догадливости команды и умения капитана правильно подобрать общую ассоциацию. А, кстати, среди персонажей попадаются мирные люди, двойные агенты и злобный убийца — вот его лучше ни за что не находить, отмена операции, отмена операции! Игра необычная и достаточно простая, поэтому затягивает на несколько часов. Не зря она стала игрой года в 2017.",
  },
  {
    title: "Игра Престолов",
    rules: "https://www.mosigra.ru/Face/Show/thrones/rules/",
    min_players: 3,
    max_players: 6,
    min_playtime: 180,
    img: "/gameImg/game_of_thrones.jpg",
    thumbnail: "/gameThumbs/game_of_thrones_.png",
    min_age: 13,
    description:
    "Да, это именно настольная карточная стратегическая игра по эпическому циклу о Вестеросе Мартина. В основу сюжета игры легли книги саги «Песнь льда и огня», четыре из которых — «Игра престолов», «Битва королей», «Буря мечей» и «Пир воронов» на текущий момент переведены на русский язык и доступны по всей стране.",
  },
  {
    title: "Ticket to Ride",
    rules: "https://www.mosigra.ru/Face/Show/ticket_to_ride_evropa_rus/rules/",
    min_players: 2,
    max_players: 5,
    min_playtime: 60,
    img: "/gameImg/ticket_to_ride.jpg",
    thumbnail: "/gameThumbs/ticket_to_ride_.png",
    min_age: 8,
    description:
    "В игре речь идёт о конкуренции нескольких железнодорожных компаний, одной из которых управляете вы, а другими — остальные игроки. Ваша задача — прокладывать маршруты между городами (причём выгоду приносят наиболее длинные), выполнять специальные задания, подбирать оптимальные пути для потока товаров — и срывать планы конкурентов. Если железные дороги станут похожими на сплетение морских узлов и будут неудобны пассажирам — это не беда, ведь главное для вас — чистая прибыль и отсутствие конкуренции хотя бы в некоторых уголках Европы."  },
  {
    title: "Ужас Аркхэма",
    rules: "https://www.mosigra.ru/uzhas-arkhjema-3-red/rules/",
    min_players: 1,
    max_players: 6,
    min_playtime: 180,
    img: "/gameImg/arkhem.jpg",
    thumbnail: "/gameThumbs/arkhem_.png",
    min_age: 14,
    description:
    "Ужас Аркхэма - всемирно популярная кооперативная игра по миру Говарда Лавкрафта. Игра предлагает четыре сценария, каждый со своим игровым полем, на которых вам придется столкнуться с Ктулху, Азатотам, Хастуром и Шуб-Ниггуратом. Каждый сюжет предполагает свои условия для достижения победы - но не обойтись без сражений с монстрами и путешествий по локациям. Каждая ваша неудача увеличивает накал страстей и приближает вас к поражению. ",
  }, */
];

/* const user = {
    name: "Anna",
    email: "123@gmail.com",
    password: '123',
  }; */


  async function seed() {
  // titles.forEach(async (title) => await Level.create({title}));

  // tags.forEach(async (title, i) => {
  //  await Tag.create({title, description: tagDescr[i]})
  // })

  // await Place.create(place);

  games.forEach(async (game) => {
   const currGame = await Game.create(game);

   currGame.tags = [
     await findTag("На целый день"),
     await findTag("Детективная"),
     await findTag("Мафия"),
     await findTag("С полем и фишками"),
     await findTag("Классика"),
   ];
   await currGame.save()
  })

  /* const myUser = await User.create(user);
  myUser.fav_games = [await findGames("Взрывные котята"), await findGames("Уно")];
  await myUser.save();
 */
  console.log("ready");
  // await mongoose.disconnect()
}

async function findTag(title) {
  const item = await Tag.findOne({ title});
  console.log(item);
  return item._id;
}

async function findGames(title) {
  const current = await Game.findOne({title});
  return current._id;
}

seed();
