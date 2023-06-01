import { Router } from "express";

const user = require('./user');
const primeleague = require('./primeleague');

const express = require('express');
const router = express.Router();

router.post('/user/login', user.login);
router.post('/user/register', user.register);
router.post('/user/logout', user.logout);
router.post('/user/isloggedin', user.isLoggedIn);
router.post('/user/gamertag', user.gamertag);
// app.use('/teams', require('./teams'));
// app.use('/primeleague', require('./primeleague'));

module.exports = router;
