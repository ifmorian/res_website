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
        resolve($('.league-team-stage').filter((index1: number, element1: any) => {
          return $(element1).children('.section-title').text() === 'Gruppenphase';
        })
          .children('.section-content')
          .children('.league-stage-matches')
          .children('li').get().map((el: any) => {
            const $game = $(el).find('table > tbody > tr');
            return {
              blue: $game.find('td:nth-child(1) a span').text(),
              red: $game.children('td').last().find('a span').text(),
              result: $game.find('td:nth-child(2) a span').text(),
              link: $game.find('td a').attr('href')
            }
          })
        )
      });
    })
  }
};