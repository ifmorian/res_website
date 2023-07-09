import { Request, Response } from "express";
import { UserInterface } from "interfaces/interfaces";
const db = require('../database/db');

const User = require('./models/User');

const emailReg: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const setUser = (res: Response, user_id: number | undefined, value: any, column: string, notEmpty: boolean) => {
  if (!user_id) {
    return res.status(200).json({
      errorCode: 3
    }).end();
  }
  if (notEmpty && !value) {
    return res.status(200).json({
      errorCode: 2
    }).end()
  }
  db.updateUser(user_id, value, column).then(() => {
    res.status(200).json({
      errorCode: 1
    }).end();
  }).catch(() => res.status(500).end());
}

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
        req.session.user_id = user.id;
        req.session.save(() => {
          res.status(200).json({
            errorCode: 1
          }).end();
        });
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
      userId: req.session.user_id
    }).end();
  },

  async setGamertag(req: Request, res: Response) {
    setUser(res, req.session.user_id, req.body.gamertag, 'gamertag', true);
  },

  async setBio(req: Request, res: Response) {
    setUser(res, req.session.user_id, req.body.bio, 'bio', false);
  },

  async setEmail(req: Request, res: Response) {
    if (!(emailReg.test(req.body.email))) return res.status(200).json({
      errorCode: 4
    }).end();
    db.emailExists(req.body.email).then((exists: boolean) => {
      if (exists) {
        return res.status(200).json({
          errorCode: 5
        }).end();
      }
      setUser(res, req.session.user_id, req.body.email, 'email', false);
    }).catch(() => res.status(500).end());
  },

  async setPassword(req: Request, res: Response) {
    if (!req.session.user_id) {
      return res.status(200).json({
        errorCode: 0
      }).end();
    }
    let errorCode = 1;
    if (!req.body.old) errorCode *= 2;
    if (!req.body.new) errorCode *= 3;
    if ((req.body.new as string).length < 8) errorCode *= 5;
    if (req.body.repeat !== req.body.new) errorCode *= 7

    if (errorCode !== 1) {
      return res.status(200).json({
        errorCode: errorCode
      }).end();
    }
    db.getUserData(req.session.user_id).then((data: any) => {
      if (!data) return res.status(500).end();
      db.loginUser({
        identifier: data.username,
        password: req.body.old
      }).then(() => {
        db.setPassword(req.session.user_id, req.body.new).then(() => {
          return res.status(200).json({
            errorCode: 1
          }).end();
        }).catch(() => res.status(500).end());
      }).catch((error: number) => {
        if (error !== 3) return res.status(500).end();
        res.status(200).json({
          errorCode: 11
        }).end();
      });
    })
  },

  async getUserData(req: Request, res: Response) {
    if (!req.session.user_id) {
      return res.status(200).json({
        errorCode: 2
      }).end();
    }
    db.getUserData(req.session.user_id).then((data: any) => {
      if (!data) {
        return res.status(200).json({
          errorCode: 3
        }).end();
      }
      return res.status(200).json({
        errorCode: 1,
        username: data.username,
        email: data.email,
        gamertag: data.gamertag,
        bio: data.bio
      }).end();
    }).catch(() => res.status(500).end());
  }

}
