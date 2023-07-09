import { AxiosResponse } from "axios";
import { accountData } from "interfaces/interfaces";

const Api = require('./Api');
const cheerio = require('cheerio');

const OpggApi = Api('https://www.op.gg');

const getProfilePage = async (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    OpggApi.get('/summoners/euw/' + name).then((res: AxiosResponse) => {
      resolve(cheerio.load(res.data));
    }).catch((err: Error) => reject(err));
  });
}


const getAccountData = async (name: string): Promise<accountData | null> => {
  return new Promise((resolve, reject) => {
    getProfilePage(name).then(($: any) => {
      const pfpContainer = $('.profile-icon');

      if (!pfpContainer.text()) return resolve(null)

      const divContainer = $('#content-container').first();

      const div = divContainer.find('.content > .info > .tier').first().text().split(' ');
      let tier = div[1];
      if (!tier) tier = divContainer.find('.content > .info > .lp').first().text();

      const data: accountData = {
        name: $('.summoner-name').text(),
        pfpId: pfpContainer.find('img').attr('src').split('.jpg')[0].split('profileIcon')[1],
        division: div[0] ? div[0] : 'unranked',
        tier: tier,
        level: pfpContainer.find('.level .level').text()
      };
      resolve(data)
    }).catch((err: Error) => reject(err));
  });
}

module.exports = {
  getAccountData
}