const express = require('express');
const cors = require('cors');
const session = require('express-session');
const memoryStore = new session.MemoryStore();

require('dotenv').config({path: `${__dirname}/../../config.env`});

const app = express();
const PORT: string = process.env.PORT || "3000";

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: '1234',
  store: memoryStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: !process.env.PRODUCTION,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  }
}));

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