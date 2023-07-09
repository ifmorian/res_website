import { Router } from "express";

const user = require('./user');
const primeleague = require('./primeleague');
const lolAccount = require('./lolAccount');

const express = require('express');
const router = express.Router();

router.post('/user/login', user.login);
router.post('/user/register', user.register);
router.post('/user/logout', user.logout);
router.post('/user/isloggedin', user.isLoggedIn);
router.post('/user/setgamertag', user.setGamertag);
router.post('/user/setbio', user.setBio);
router.post('/user/setemail', user.setEmail);
router.post('/user/setpassword', user.setPassword);
router.post('/user/data', user.getUserData);
router.post('/account/lol/update', lolAccount.updateAccount);
router.post('/account/lol/getaccount', lolAccount.getAccount);
router.post('/account/lol/champions', lolAccount.getChampionList);
router.post('/account/lol/mainchampions', lolAccount.getMainChampions);
router.post('/account/lol/addmain', lolAccount.addMainChampion);
router.post('/account/lol/removemain', lolAccount.removeMainChampion);
router.post('/account/lol/updaterole', lolAccount.updateRole);
router.post('/account/lol/getrole', lolAccount.getRole);
// app.use('/teams', require('./teams'));
// app.use('/primeleague', require('./primeleague'));

module.exports = router;
