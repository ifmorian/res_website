import { Database, RunResult } from "sqlite3";
import { Credentials, LoginCredentials, Team, UserInterface, accountData } from "../interfaces/interfaces";
import { resolve } from "path";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const sqlite3 = require('sqlite3');

const USERTABLE = 'user';
const USER_IN_TEAM_TABLE = 'user_in_team';
const USER_LOL_ACCOUNT_TABLE = 'user_lol_account';
const LOL_ROLE_TABLE = 'lol_role';
const LOL_CHAMPION_TABLE = 'lol_champion';
const LOL_DATA_TABLE = 'lol_data';
const VALORANT_ACCOUNT_TABLE = 'valorant_account';
const TEAMTABLE = 'team';

const getTeamId = async(name: string): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    let sql: string = `SELECT id FROM ${TEAMTABLE} WHERE name=?`;
    db.get(sql, [name], (err: Error, rows: {id: number}) => {
      if (err) return reject(err);
      rows ? resolve(rows.id) : resolve(null);
    });
  });
};

const updateUser = async (user_id: number, value: string, column: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    let sql: string = `UPDATE ${USERTABLE} SET ${column}=? WHERE id=?`;
    db.all(sql, [value, user_id], (err: Error): void => {
      err ? reject(err) : resolve();
    });
  });
};

const db: Database = new sqlite3.Database('./databases/database.db', (err: any) => {
  if (err) return console.error(err.message);
  db.run(`CREATE TABLE IF NOT EXISTS ${USERTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    admin INTEGER DEFAULT 0,
    gamertag TEXT,
    bio TEXT
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${USER_IN_TEAM_TABLE} (
    user_id INTEGER,
    team_id INTEGER,
    role INTEGER NOT NULL,
    PRIMARY KEY (user_id, team_id)
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${USER_LOL_ACCOUNT_TABLE} (
    user_id INTEGER NOT NULL PRIMARY KEY,
    account TEXT NOT NULL
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${LOL_ROLE_TABLE} (
    user_id INTEGER NOT NULL PRIMARY KEY,
    role INTEGER NOT NULL
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${LOL_DATA_TABLE} (
    account TEXT PRIMARY KEY NOT NULL,
    name TEXT,
    pfp_id TEXT DEFAULT "29",
    division TEXT,
    tier TEXT,
    level TEXT
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${LOL_CHAMPION_TABLE} (
    user_id TEXT NOT NULL,
    number INTEGER NOT NULL,
    champion TEXT,
    PRIMARY KEY(user_id, number)
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${VALORANT_ACCOUNT_TABLE} (
    user_id INTEGER NOT NULL,
    account TEXT NOT NULL,
    main_role INTEGER DEFAULT 0,
    sec_role INTEGER,
    PRIMARY KEY (user_id)
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${TEAMTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    game TEXT NOT NULL DEFAULT lol,
    prime_id TEXT,
    bio TEXT,
    active INTEGER NOT NULL DEFAULT 1
  );`);
});

const exists = async (query: string, field: string): Promise<boolean> => {
  let sql: string = `SELECT * FROM ${USERTABLE} WHERE ${field}=?`
  return new Promise((resolve, reject) => {
    db.all(sql, [query], (err: Error, rows: Array<Object>) => {
      err ? reject(err) : resolve(rows.length > 0);
    });
  })
};

module.exports = {
  registerUser: async (credentials: Credentials): Promise<void> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(credentials.password, saltRounds, (err: Error, hash: string): void => {
        if (err) return reject(err);
        let sql: string = `INSERT INTO ${USERTABLE} (username, email, password, gamertag) VALUES (?,?,?,?)`;
        db.all(sql, [credentials.username, credentials.email, hash, credentials.username], (err: Error): void => {
          err ? reject(err) : resolve();
        });
      });
    });
  },
  loginUser: async (credentials: LoginCredentials): Promise<UserInterface> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT * FROM ${USERTABLE} WHERE (username=? OR email=?)`;
      db.get(sql, [credentials.identifier, credentials.identifier], (err: Error, row: UserInterface): void => {
        if (err) {
          console.error(err);
          return reject(0);
        }
        if (!row) return reject(2);
        bcrypt.compare(credentials.password, row.password, (err: Error, result: boolean) => {
          if (err) {
            console.error(err);
            reject(0);
          }
          result ? resolve(row) : reject(3);
        });
      });
    });
  },
  setPassword: async (user_id: number, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err: Error, hash: string): void => {
        if (err) reject();
        updateUser(user_id, hash, 'password').then(() => resolve()).catch(() => reject());
      });
    })
  },
  updateUser,
  getUserData: async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT username, email, gamertag, bio FROM ${USERTABLE} WHERE id=?`;
      db.get(sql, [id], (err: Error, row: any): void => {
        err ? reject(err) : resolve(row);
      });
    });
  },
  userExists: async (username: string): Promise<boolean> => {
    return exists(username, 'username');
  },
  emailExists: async (email: string): Promise<boolean> => {
    return exists(email, 'email');
  },
  updateLolAccount: async (id: number, account: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `INSERT INTO ${USER_LOL_ACCOUNT_TABLE} (user_id, account) VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET account=?`;
      db.all(sql, [id, account, account], (err: Error) => {
        if (err) return reject(err);
        resolve();
      });
    })
  },
  updateLolData: async (account: string, data: accountData): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `INSERT INTO ${LOL_DATA_TABLE} (account, name, pfp_id, division, tier, level) VALUES(?,?,?,?,?,?)
      ON CONFLICT(account) DO UPDATE SET name=?, pfp_id=?, division=?, tier=?, level=?`;
      db.all(sql, [account, data.name, data.pfpId, data.division, data.tier, data.level, data.name, data.pfpId, data.division, data.tier, data.level],(err: Error) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  getLolAccount: async (id: number): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT account FROM ${USER_LOL_ACCOUNT_TABLE} WHERE user_id=?`;
      db.get(sql, [id], (err: Error, row: any) => {
        if (!row) return resolve(null);
        err ? reject(err) : resolve(row.account);
      });
    });
  },
  getLolData: async (account: string): Promise<accountData> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT * FROM ${LOL_DATA_TABLE} WHERE account=?`;
      db.get(sql, [account], (err: Error, row: any) => {
        err ? reject(err) : resolve({
          name: row.name,
          pfpId: row.pfp_id,
          division: row.division,
          tier: row.tier,
          level: row.level
        });
      });
    });
  },
  getLolChampions: async (id: number): Promise<Array<string>> => {
    return new Promise(async (resolve, reject) => {
      let sql: string = `SELECT champion, number FROM ${LOL_CHAMPION_TABLE} WHERE user_id=?`;
      let result = new Array<string>();
      db.all(sql, [id], (err: Error, row: RunResult) => {
        if (err) return reject(err);
        Object.entries(row).forEach((element: any) => {
          result.push(element[1]);
        });
        resolve(result);
      });
    });
  },
  addLolChampion: async (key: string, number: string, user_id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `REPLACE INTO ${LOL_CHAMPION_TABLE} (user_id, number, champion) VALUES(?,?,?)`;
      db.all(sql, [user_id, number, key], (err: Error) => {
        err ? reject(err) : resolve();
      });
    });
  },
  removeLolChampion: async (user_id: number, number: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `DELETE FROM ${LOL_CHAMPION_TABLE} WHERE (user_id=? AND number=?)`;
      db.all(sql, [user_id, number], (err: Error) => {
        err ? reject(err) : resolve();
      });
    });
  },
  updateLolRole: async  (user_id: number, role: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `INSERT INTO ${LOL_ROLE_TABLE} (user_id, role) VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET role=?`;
      db.all(sql, [user_id, role, role], (err: Error) => {
        err ? reject(err) : resolve();
      });
    });
  },
  getLolRole: async (user_id: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT role FROM ${LOL_ROLE_TABLE} WHERE user_id=?`;
      db.get(sql, [user_id], (err: Error, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(1);
        resolve(row.role);
      });
    });
  },
  isAdmin: async (user_id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT admin FROM ${USERTABLE} WHERE id=?`;
      db.get(sql, [user_id], (err: Error, row: any) => {
        console.log(row) //c!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      });
    });
  },
  teamExists: async (team: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT * FROM ${TEAMTABLE} WHERE name=?`;
      db.get(sql, [team], (err: Error, row: any) => {
        err ? reject(err) : resolve(row);
      });
    });
  },
  createTeam: async (team: Team): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `INSERT INTO ${TEAMTABLE} (name, game) VALUES (?,?)`;
      db.all(sql, [team.name, team.game], (err: Error): void => {
        err ? reject(err) : resolve();
      });
    });
  },
  setTeamActive: async(team: Team, active: boolean): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let teamId = getTeamId(team.name);
      if (!teamId) resolve(false);
      let sql: string = `UPDATE ${TEAMTABLE} SET active=? WHERE id=?`;
      db.all(sql, [active, teamId], (err: Error): void => {
        err ? reject(err) : resolve(true);
      });
    });
  },
  getTeamId,
  addTeamMember: async (userId: string, teamId: Number): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `INSERT INTO ${USER_IN_TEAM_TABLE} (user_id, team_id) VALUES (?,?)`;
      db.all(sql, [userId, teamId], (err: Error): void => {
        err ? reject(err) : resolve();
      })
    })
  }
};