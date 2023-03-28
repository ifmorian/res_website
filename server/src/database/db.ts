import { resolve } from "path";
import { Database } from "sqlite3";
import { credentials, user } from "../interfaces/interfaces";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const sqlite3 = require('sqlite3');

const USERTABLE = 'user';

const db: Database = new sqlite3.Database('./databases/database.db', (err: any) => {
  if (err) return console.error(err.message);
  db.run(`CREATE TABLE IF NOT EXISTS ${USERTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`);
});

const exists = async (query: string, field: string, cb: CallableFunction): Promise<boolean> => {
  let sql: string = `SELECT * FROM ${USERTABLE} WHERE ${field}=?`
  return new Promise((resolve) => {
    db.all(sql, [query], (err: Error, rows: Array<Object>) => {
      err ? cb(0) : resolve(rows.length > 0);
    });
  })
};

module.exports = {
  registerUser: (credentials: credentials, cb: CallableFunction): void => {
    bcrypt.hash(credentials.password, saltRounds, (err: Error, hash: string): void => {
      if (err) return cb(0);
      let sql: string = `INSERT INTO ${USERTABLE} (username, email, password) VALUES (?,?,?)`;
      db.all(sql, [credentials.username, credentials.email, hash], (err: Error): void => {
        err ? cb(0) : cb(1);
      });
    });
  },
  loginUser: (credentials: credentials, cb: CallableFunction): void => {
    let sql: string = `SELECT * FROM ${USERTABLE} WHERE (username=? OR email=?)`;
    db.get(sql, [credentials.username, credentials.email, credentials.password], (err: Error, row: user): void => {
      if (err) return cb(0);
      if (!row) return cb(2);
      bcrypt.compare(credentials.password, row.password, (err: Error, result: boolean) => {
        if (err) return cb(0);
        result ? cb(1) : cb(3);
      });
    });
  },
  userExists: async (username: string, cb: CallableFunction): Promise<boolean> => {
    return exists(username, 'username', cb);
  },
  emailExists: async (email: string, cb: CallableFunction): Promise<boolean> => {
    return exists(email, 'email', cb);
  }
};