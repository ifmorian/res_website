import { PrimeGame } from "interfaces/interfaces";

const Api = require('./Api');
const cheerio = require('cheerio');

const PrimeApi = () => {
  return Api('https://www.primeleague.gg');
}

const getTeamSite = async (teamId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    PrimeApi().get('/leagues/teams/' + teamId).
      then((res: any) => {
        resolve(cheerio.load(res.data));
      })
      .catch((err: Error) => reject(err));
  });
}

module.exports = {
  getGames: async (teamId: string): Promise<Array<PrimeGame>> => {
    return new Promise((resolve, reject) => {
      getTeamSite(teamId)
      .then(($: any) => {
        console.log($('.league-team-stage').filter((index1: number, element1: any) => {
          return $(element1).children('.section-title').text() === 'Gruppenphase';
        })
          .children('.section-content')
          .children('.league-stage-matches').toArray().map((el: any) => {
            return {
              blue: '',
              red: '',
              link: $(el).text()
            }
          })
        )
      });
    })
  }
};