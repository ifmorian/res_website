import { Database } from "sqlite3";
import { Credentials, LoginCredentials, Team, UserInterface } from "../interfaces/interfaces";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const sqlite3 = require('sqlite3');

const USERTABLE = 'user';
const USER_IN_TEAM_TABLE = 'user_in_team';
const PROFILETABLE = 'profile';
const TEAMTABLE = 'team';

const db: Database = new sqlite3.Database('./databases/database.db', (err: any) => {
  if (err) return console.error(err.message);
  db.run(`CREATE TABLE IF NOT EXISTS ${USERTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    admin INTEGER DEFAULT 0,
    display_name TEXT,
    bio TEXT
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${USER_IN_TEAM_TABLE} (
    user_id INTEGER,
    team_id INTEGER,
    PRIMARY KEY (user_id, team_id)
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${PROFILETABLE} (
    user_id INTEGER NOT NULL,
    profile_name TEXT NOT NULL,
    game TEXT DEFAULT lol,
    role TEXT,
    PRIMARY KEY (user_id, game)
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${TEAMTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    game TEXT NOT NULL DEFAULT lol,
    prime_id TEXT,
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
        let sql: string = `INSERT INTO ${USERTABLE} (username, email, password, display_name) VALUES (?,?,?,?)`;
        db.all(sql, [credentials.username, credentials.email, hash, credentials.username], (err: Error): void => {
          err ? reject(err) : resolve();
        });
      });
    })
  },
  loginUser: async (credentials: LoginCredentials): Promise<UserInterface> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT * FROM ${USERTABLE} WHERE (username=? OR email=?)`;
      db.get(sql, [credentials.identifier, credentials.identifier], (err: Error, row: UserInterface): void => {
        if (err) return reject(0); console.error(err);
        if (!row) return reject(2);
        bcrypt.compare(credentials.password, row.password, (err: Error, result: boolean) => {
          if (err) reject(0); console.error(err);
          result ? reject(1) : resolve(row);
        });
      });
    })
  },
  userExists: async (username: string): Promise<boolean> => {
    return exists(username, 'username');
  },
  emailExists: async (email: string): Promise<boolean> => {
    return exists(email, 'email');
  },
  isAdmin: async (user_id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT admin FROM ${USERTABLE} WHERE id=?`;
      db.get(sql, [user_id], (err: Error, row: any) => {
        console.log(row)
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
  setTeamActive: async(active: boolean): Promise<number> => {
    return new Promise((resolve, reject) => {

    });
  },
  getTeamId: async(name: string): Promise<number | null> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT id FROM ${TEAMTABLE} WHERE name=?`;
      db.get(sql, [name], (err: Error, rows: {id: number}) => {
        if (err) return reject(err);
        rows ? resolve(rows.id) : resolve(null);
      });
    });
  },
  addTeamMember: async (userId: string, teamId: Number): Promise<void> => {
    return new Promise((resolve, reject) => {
      let sql: string = `INSERT INTO ${USER_IN_TEAM_TABLE} (user_id, team_id) VALUES (?,?)`;
      db.all(sql, [userId, teamId], (err: Error): void => {
        err ? reject(err) : resolve();
      })
    })
  }
};