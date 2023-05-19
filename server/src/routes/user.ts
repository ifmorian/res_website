import { Request, Response } from "express";
import { UserInterface } from "interfaces/interfaces";
const express = require('express');
const router = express.Router();
const db = require('../database/db');

const User = require('./models/User');

module.exports =  {

  async register(req: Request, res: Response) {
    await User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordRepeat: req.body.passwordRepeat
    })
      .then(async (errorCode: Number) => {
        if (errorCode !== 1) return res.status(200).json({errorCode: errorCode});
        await db.registerUser({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
          .then(() => res.status(200).json({errorCode: 1}))
          .catch((err: Error) => {
            console.error(err);
            res.status(500);
          });
      })
      .catch((err: Error) => {
        console.error(err);
        res.status(500);
      });
    res.end();
  },

  async login(req: Request, res: Response) {
    await db.loginUser({
      identifier: req.body.identifier,
      password: req.body.password
    })
      .then((user: UserInterface) => {
        let session = req.session;
        session.user_id = user.id;
        res.status(200).json({
          errorCode: 1
        }).end();
      })
      .catch((errorCode: number) => {
        if (errorCode === 0) return res.status(500).end();
        res.status(200).json({
          errorCode: errorCode
        }).end();
      });
  },

  async logout(req: Request, res: Response) {
    req.session.destroy((err: Error) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      res.status(204).end();
    });
  },

  async isLoggedIn(req: Request, res: Response) {
    res.status(200).send({
      login: req.session.user_id
    }).end();
  }

}
