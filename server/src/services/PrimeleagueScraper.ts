const Api = require('./Api');
const cheerio = require('cheerio');

const URL = 'https://www.primeleague.gg';

const PrimeApi = () => {
  return Api(URL);
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

const getTeamDataFromGame = async (link: string, blue: boolean): Promise<object> => {
  return new Promise((resolve, reject) => {
    PrimeApi().get(link.substring(URL.length))
      .then((res: any) => {
        const $ = cheerio.load(res.data)
        const teamLink = cheerio.load(res.data)(`.content-match-head-team${blue ? '1' : '2'} div a`).attr('href');
        PrimeApi().get(teamLink.substring(URL.length))
          .then((res: any) => {
            const $ = cheerio.load(res.data);
            resolve(getTeamData($));
          })
      })
      .catch((err: Error) => reject(err));
  });
}

const getTeamData = ($: any): object => {
  return {
    name: $('.page-title h1').text(),
    seed: $('.content-portrait-head .content-icon-info li:nth-child(2)').text().substring(25)
  }
}

export = {
  getGames: async (teamId: string): Promise<Array<object>> => {
    return new Promise((resolve, reject) => {
      getTeamSite(teamId)
      .then(($: any) => {
        const teamTag = $('.breadcrumbs li:nth-child(3) div span').text();
        resolve($('.league-team-stage').filter((index1: number, element1: any) => {
          return $(element1).children('.section-title').text() === 'Gruppenphase';
        })
          .children('.section-content')
          .children('.league-stage-matches')
          .children('li').toArray().reduce(async (prev: any, el: any) => {
            const result = await prev;

            const $game = $(el).find('table > tbody > tr');
            const link = $game.find('td a').attr('href');
            const blueTag = $game.find('td:nth-child(1) a span').text();
            const redTag = $game.children('td').last().find('a span').text();
            return [...result, {
              date: $(el).find('div span').text(),
              result: $game.find('td:nth-child(2) a span').text(),
              link: link,
              blue: {
                tag: blueTag,
                ...(await getTeamDataFromGame(link, true))
              },
              red: {
                tag: redTag,
                ...(await getTeamDataFromGame(link, false))
              }
            }]
          }, Promise.resolve([]))
        )
      })
      .catch((err: Error) => reject(err));
    })
  }
};