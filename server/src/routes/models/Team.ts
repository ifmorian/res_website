import { Team } from '../../interfaces/interfaces';
const db = require('../../database/db');

module.exports = async (team: Team): Promise<Number> => {
  return new Promise((resolve, reject) => {
    db.teamExists(team.name)
      .then((exists: boolean) => {
        if (exists) return resolve(2);

        db.createTeam(team)
          .then(() => {
            return resolve(1)
          })
          .catch((err: Error) => reject(err));
      })
      .catch((err: Error) => reject(err));
  });
}