import { Request, Response } from "express";
import { accountData } from "interfaces/interfaces";

const db = require('../database/db');
const opggScraper = require('../services/OpggScraper');
const riotDragonService = require('../services/RiotDragonService')

const updateAccount = async (req: Request, res: Response) => {
  let errorCode = 1;
  let account: string = req.body.account;
  if (!account) errorCode = 3;
  if (!req.session.user_id) errorCode = 2;
  if (errorCode !== 1) {
    return res.status(200).json({
      errorCode: errorCode
    }).end();
  }
  account = account.replace(/\s/g, "");
  account = account.toLocaleLowerCase();
  db.updateLolAccount(req.session.user_id, account).then(() => {
    opggScraper.getAccountData(account).then((data: accountData) => {
      if (!data) {
        return res.status(200).json({
          errorCode: 4
        }).end();
      }
      db.updateLolData(account, data).then(() => {
        riotDragonService.cachePfp(data.pfpId).then(() => {
          res.status(200).json({
            errorCode: 1,
            data: data
          }).end();
        }).catch(() => {
          res.status(200).json({
            errorCode: 5,
            data: data
          }).end();
        });;
      }).catch(() => {
        res.status(500).end();
      });
    })
  }).catch(() => {
    res.status(500).end();
  });
};

const getAccount = async (req: Request, res: Response) => {
  if (!req.session.user_id) {
    return res.status(200).json({
      errorCode: 2
    }).end();
  };
  db.getLolAccount(req.session.user_id).then((account: string) => {
    if (!account) {
      return res.status(200).json({
        errorCode: 3
      }).end();
    }

    db.getLolData(account).then((data: accountData) => {
      res.status(200).json({
        account: account,
        name: data.name,
        pfpId: data.pfpId,
        division: data.division,
        tier: data.tier,
        level: data.level
      }).end();
    }).catch(() => res.status(500).end());
  }).catch(() => res.status(500).end());
}

const getChampionList = async (req: Request, res: Response) => {
  riotDragonService.getChampionList().then((data: Object) => {
    res.status(200).json({list: data}).end();
  }).catch(() => res.status(500).end());
}

const addMainChampion = async (req: Request, res: Response) => {
  if (!req.body.key || !req.body.number) {
    return res.status(400).end();
  }
  if (!req.session.user_id) {
    return res.json({
      errorCode: 2
    }).end();
  }
  db.addLolChampion(req.body.key, req.body.number, req.session.user_id).then(() => {
    riotDragonService.cacheChampionIcon(req.body.key).then(() => {
      riotDragonService.cacheChampionSplash(req.body.key).then(() => {
        res.status(200).json({
          errorCode: 1
        });
      }).catch(() => {
        res.status(200).json({
          errorCode: 3
        });
      })
    }).catch(() => {
      res.status(200).json({
        errorCode: 3
      });
    });
  }).catch(() => res.status(500).end());
}

const getMainChampions = async (req: Request, res: Response) => {
  if (!req.session.user_id) {
    return res.status(200).json({
      errorCode: 2
    }).end();
  }
  db.getLolChampions(req.session.user_id).then((champs: Array<any>) => {
    res.status(200).json({
      champions: champs
    }).end();
  }).catch(() => res.status(500).end());
}

const removeMainChampion = async (req: Request, res: Response) => {
  if (!req.session.user_id) {
    return res.status(200).json({
      errorCode: 2
    }).end();
  }
  if (!req.body.number) {
    return res.status(400).end();
  }
  db.removeLolChampion(req.session.user_id, req.body.number).then(() => {
    return res.status(200).json({
      errorCode: 1
    }).end();
  }).catch(() => res.status(500).end());
}

const updateRole = async (req: Request, res: Response) => {
  if (!req.session.user_id) {
    return res.status(200).json({
      errorCode: 2
    }).end();
  }
  if (!req.body.role) {
    return res.status(400).end();
  }
  db.updateLolRole(req.session.user_id, req.body.role).then(() => {
    return res.status(200).json({
      errorCode: 1
    }).end();
  }).catch((err: Error) => {
    console.log(err.message)
    res.status(500).end()
  });
}

const getRole = async (req: Request, res: Response) => {
  if (!req.session.user_id) {
    return res.status(200).json({
      errorCode: 2
    }).end();
  }
  db.getLolRole(req.session.user_id).then((role: number) => {
    return res.status(200).json({
      errorCode: 1,
      role: role
    }).end();
  }).catch(() => res.status(500).end());
}

module.exports = {
  updateAccount,
  getAccount,
  getChampionList,
  addMainChampion,
  getMainChampions,
  removeMainChampion,
  updateRole,
  getRole
}