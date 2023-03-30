import { registerCredentials } from "../../interfaces/interfaces";

const emailReg: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = async (
  credentials: registerCredentials
): Promise<Number> => {
  const db = require('./../../database/db');

  return new Promise(async (resolve, reject) => {
    let errorCode = 1;
    if (!credentials.username) errorCode *= 2;
    if (!credentials.email) errorCode *= 3;
    if (!credentials.password) errorCode *= 5;
    if (credentials.password !== credentials.passwordRepeat) errorCode *= 7;
    if(!(emailReg.test(credentials.email))) errorCode *= 11;
    await db.userExists(credentials.username)
      .then((result: boolean) => {
        if (result) errorCode *= 13;
      })
      .catch((err: Error) => reject(err));
    await db.emailExists(credentials.email)
      .then((result: boolean) => {
        if (result) errorCode *= 17;
      })
      .catch((err: Error) => reject(err));
  
    resolve(errorCode);
  });
}