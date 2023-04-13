import { Request, Response } from "express";
const PrimeleagueScraper = require("../services/PrimeleagueScraper");

module.exports = () => {
  
  const router = express.Router();
  
  router.post('/games', (req: Request, res: Response) => {
    if (!req.body.teamid) return res.end(); //status code adden
    PrimeleagueScraper.getGames(req.body.teamid)
      .then((games: Array<object>) => {
        res.status(200).send(games).end();
      })
      .catch((err: Error) => {
        console.error(err.message);
        res.status(500).end();
      })
  });
}