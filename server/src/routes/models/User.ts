import { registerCredentials } from "../../interfaces/interfaces";

module.exports = (
  credentials: registerCredentials,
  cb: CallableFunction
) => {
  const db = require('./../../database/db');

  let errorCode = 1;
  if (credentials.username === '') errorCode *= 2;
  if (credentials.email === '') errorCode *= 3;
  if (credentials.password === '') errorCode *= 5;
  if (credentials.password !== credentials.passwordRepeat) errorCode *= 7;
  if (db.userExists) errorCode *= 11;
  if (db.emailExists) errorCode *= 13;

  if (errorCode !== 1) return cb(errorCode);

  if (
    db.registerUser({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    }, cb)
  ) return cb(1);
  return cb(0);
}