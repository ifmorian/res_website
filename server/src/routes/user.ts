import { Request, Response } from "express";
const express = require('express');

const User = require('./models/User');

module.exports = {

  register: (req: Request, res: Response) => {

    User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordRepeat: req.body.passwordrepeat
    }, (errorCode: Number) => {
      res.send({
        errorCode: errorCode
      })
      res.end();
    });
  }

  // router.post('/login', (req: Request, res: Response) => {
  //   db.loginUser({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password
  //   }, (errorCode: number) => {
  //     res.end({
  //       errorCode: errorCode
  //     });
  //   })
  // });

}
