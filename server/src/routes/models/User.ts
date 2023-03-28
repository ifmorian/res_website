import { registerCredentials } from "../../interfaces/interfaces";

module.exports = async (
  credentials: registerCredentials,
  cb: CallableFunction
): Promise<void> => {
  const db = require('./../../database/db');

  let errorCode = 1;
  if (!credentials.username) errorCode *= 2;
  if (!credentials.email) errorCode *= 3;
  if (!credentials.password) errorCode *= 5;
  if (credentials.password !== credentials.passwordRepeat) errorCode *= 7;
  if (await db.userExists(credentials.username, cb)) errorCode *= 11;
  if (await db.emailExists(credentials.email, cb)) errorCode *= 13;

  if (errorCode !== 1) return cb(errorCode);

  db.registerUser({
    username: credentials.username,
    email: credentials.email,
    password: credentials.password
  }, cb);
}