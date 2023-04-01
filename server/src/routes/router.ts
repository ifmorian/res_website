import { Router } from "express";

const user = require('./user');
const primeleague = require('./primeleague')

const express1 = require('express')
const router: Router = express1.Router();

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);

router.post('/teams');

router.post('/games', primeleague.getTeamSchedule);

module.exports = router;