import { Request, Response, response } from "express";
const Team = require('./models/Team');
const db = require('../database/db');

module.exports = (express: any) => {
  const router = express.Router();

  router.post('/create', (req: Request, res: Response) => {
      Team(
        req.body.name,
        req.body.game,
        null
      )
        .then((errorCode: number) => {
          res.status(200).json({
            errorCode: errorCode
          }).end();
        })
        .catch((err: Error) => {
          console.error(err.message);
          res.status(500).end();
        });
  });

  router.post('/setactive', (req: Request, res: Response) => {
    
  });
}