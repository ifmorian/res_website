import { Router } from "express";

const user = require('./user');

const express1 = require('express')
const router: Router = express1.Router();

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);

router.post('/teams');

module.exports = router;