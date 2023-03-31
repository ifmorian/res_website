import { resolve } from "path";
import { Database } from "sqlite3";
import { credentials, loginCredentials, Team, user } from "../interfaces/interfaces";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const sqlite3 = require('sqlite3');

const USERTABLE = 'user';
const PLAYERTABLE = 'player';
const PROFILETABLE = 'profile';
const TEAMTABLE = 'team';

const db: Database = new sqlite3.Database('./databases/database.db', (err: any) => {
  if (err) return console.error(err.message);
  db.run(`CREATE TABLE IF NOT EXISTS ${USERTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    admin INTEGER DEFAULT 0
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${PLAYERTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    user_id INTEGER,
    team_id INTEGER,
    bio TEXT
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${PROFILETABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    profile_name TEXT NOT NULL,
    game TEXT DEFAULT lol,
    role TEXT
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS ${TEAMTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    game TEXT DEFAULT lol,
    prime_id TEXT
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
  registerUser: async (credentials: credentials): Promise<void> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(credentials.password, saltRounds, (err: Error, hash: string): void => {
        if (err) return reject(err);
        let sql: string = `INSERT INTO ${USERTABLE} (username, email, password) VALUES (?,?,?)`;
        db.all(sql, [credentials.username, credentials.email, hash], (err: Error): void => {
          err ? reject(err) : resolve();
        });
      });
    })
  },
  loginUser: async (credentials: loginCredentials): Promise<Number> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT * FROM ${USERTABLE} WHERE (username=? OR email=?)`;
      db.get(sql, [credentials.identifier, credentials.identifier], (err: Error, row: user): void => {
        if (err) return reject(err);
        if (!row) return resolve(2);
        bcrypt.compare(credentials.password, row.password, (err: Error, result: boolean) => {
          if (err) reject(err);
          result ? resolve(1) : resolve(3);
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
  getTeamId: async(name: string): Promise<Number | null> => {
    return new Promise((resolve, reject) => {
      let sql: string = `SELECT id FROM ${TEAMTABLE} WHERE name=?`;
      db.get(sql, [name], (err: Error, rows: {id: Number}) => {
        if (err) return reject(err);
        rows ? resolve(rows.id) : resolve(null);
      });
    });
  },
  addTeamMember: async (playerId: string, teamId: Number): Promise<void> => {
    let sql: string = `INSERT INTO ${PLAYERTABLE} (name, game) VALUES (?,?)`;
  }
};