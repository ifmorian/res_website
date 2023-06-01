const express = require('express');
const cors = require('cors');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const memoryStore = new sessions.MemoryStore();

require('dotenv').config({path: `${__dirname}/../../config.env`});

const app = express();
const PORT: string = process.env.PORT || "3000";

app.use(cors({
  origin: [
    'http://127.0.0.1:5173',
    'http://localhost:5173'
  ],
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(sessions({
  saveUninitialized: false,
  resave: false,
  store: memoryStore,
  secret: '1234',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true
  }
}));
app.use(cookieParser());

app.use('/', require('./routes/router'));

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

const fs = require('fs');
let dir = './databases'
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

require('./database/db.ts');
require('./services/PrimeleagueScraper.ts').getGames('155034-ragequit-gaming').then((res: any) => {
  console.log(res)
}).catch((err: Error) => console.error(err.message));