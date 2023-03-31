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
        let games: Array<PrimeGame> = $('.league-team-stage').filter((index1: number, element1: any) => {
          return $(element1).children('.section-title').text() === 'Gruppenphase';
        })
          .children('.section-content')
          .children('.league-stage-matches')
          .each((index2: number, element2: any) => {
            console.log(element2)
            return {
              blue: '',
              red: '',
              result: '',
              link: $(element2)
              .children('li').children('table').children('tbody').children('tr').filter((index3: number, element3: any) => {
                return index3 === 0;
              }).children('a').attr('href')
            }
          })
        resolve(games);
      });
    })
  }
};