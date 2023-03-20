import { Database } from "sqlite3";
import { credentials } from "../interfaces/interfaces";

const sqlite3 = require('sqlite3');

const USERTABLE = 'user';

const db: Database = new sqlite3.Database('./databases/database.db', (err: any) => {
  if (err) return console.error(err.message);
  db.run(`CREATE TABLE IF NOT EXISTS ${USERTABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`);
});

const exists = (query: string, field: string, cb: CallableFunction): boolean => {
  let sql: string = `SELECT * FROM ${USERTABLE} WHERE ${field}=?`
  db.all(sql, [query], (err: Error, rows: Array<Object>) => {
    if (err) {
      cb(0);
      console.error(err);
      return true;
    }
    return rows.length > 0;
  });
  return true;
};

module.exports = {
  db,
  registerUser: (credentials: credentials, cb: CallableFunction): boolean => {
    let sql: string = `INSERT INTO ${USERTABLE} (name, email, password) VALUES (?,?,?)`;
    db.all(sql, [credentials.username, credentials.email, credentials.password], err => {
      if (err) {
        cb(0);
        console.error(err);
        return false;
      }
      return true;
    });
    return false;
  },
  loginUser: (credentials: credentials, cb: CallableFunction): boolean => {
    let sql: string = `SELECT * FROM ${USERTABLE} WHERE (name=? OR email=?) AND password=?`;
    db.all(sql, [credentials.username, credentials.email, credentials.password], err => {
      if (err) {
        cb(0);
        console.error(err);
        return false;
      }
      return true;
    });
    return false;
  },
  userExists: (username: string, cb: CallableFunction): boolean => {
    return exists(username, 'name', cb);
  },
  emailExists: (email: string, cb: CallableFunction): boolean => {
    return exists(email, 'email', cb);
  }
};