import { Request, Response } from "express";
import { UserInterface } from "interfaces/interfaces";
const db = require('../database/db');

const User = require('./models/User');

module.exports = (express: any) => {

  const router = express.Router();

  router.post('/register', async (req: Request, res: Response) => {

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
  });

  router.post('/login', async (req: Request, res: Response) => {
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
  });

  router.post('/logout', async (req: Request, res: Response) => {
    console.log(req.session)
    req.session.destroy((err: Error) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      res.status(204).end();
    });
  });

}
