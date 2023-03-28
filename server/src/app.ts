const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({path: `${__dirname}/../config.env`});

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
}))

app.use('/', require('./routes/router'));

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

require('./database/db.ts');