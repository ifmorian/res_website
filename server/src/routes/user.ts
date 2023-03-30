import { Request, Response } from "express";
const db = require('../database/db');

const User = require('./models/User');

module.exports = {

  register: async (req: Request, res: Response) => {

    await User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordRepeat: req.body.passwordRepeat
    })
      .then(async (errorCode: Number) => {
        if (errorCode !== 1) return res.status(200).send({errorCode: errorCode});
        await db.registerUser({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
          .then(() => res.status(200).send({errorCode: 1}))
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

  login: async (req: Request, res: Response) => {
    await db.loginUser({
      identifier: req.body.identifier,
      password: req.body.password
    })
      .then((errorCode: Number) => {
        if (errorCode === 1) {
          let session = req.session;
          session.isloggedin = true;
        }
        res.status(200).send({
          errorCode: errorCode
        }).end();
      })
      .catch((err: Error) => {
        console.error(err);
        res.status(500);
      });
  },

  logout: async (req: Request, res: Response) => {
    console.log(req.session)
    req.session.destroy((err: Error) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      res.status(204).end();
    });
  }

}
