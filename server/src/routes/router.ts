import { Router } from "express";

const user = require('./user');
const primeleague = require('./primeleague');

const express1 = require('express');

module.exports = (app: any) => {
  app.use('/user', require('./user')(express1));
  app.use('/teams', require('./teams')(express1));
  app.use('/primeleague', require('./primeleague')(express1));
};