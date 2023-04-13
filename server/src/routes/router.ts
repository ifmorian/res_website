import { Router } from "express";

const user = require('./user');
const primeleague = require('./primeleague');

const express1 = require('express');

module.exports = (app: any) => {
  app.use('/user', require('./user'));
  app.use('/teams', require('./teams'));
  app.use('/primeleague', require('./primeleague'));
};