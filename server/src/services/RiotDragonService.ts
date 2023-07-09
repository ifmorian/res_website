import { AxiosResponse } from "axios";

const fs = require('fs');
const Api = require('./Api');

const DDragonApi = Api('http://ddragon.leagueoflegends.com/cdn/');
const CDragonApi = Api('https://raw.communitydragon.org/latest/');

const getVersion = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    CDragonApi.get('content-metadata.json').then((res: AxiosResponse) => {
      const version = res.data.version.split('.');
      resolve(version[0] + '.' + version[1] + '.1');
    }).catch((err: Error) => reject(err));
  });
}

const getChampionList = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    getVersion().then((version: string) => {
      DDragonApi.get(version + '/data/en_GB/champion.json').then((res: AxiosResponse) => {
        resolve(res.data.data);
      }).catch((err: Error) => reject(err));
    }).catch((err: Error) => reject(err));
  });
}

const saveImage = async (res: AxiosResponse, path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(path);
    res.data.pipe(writer);
    let error: Error | null = null;
    writer.on('error', (err: Error) => {
      error = err;
      writer.close();
      reject(err);
    });
    writer.on('close', () => {
      if (!error) resolve();
    });
  });
}

const cacheChampionIcon = async (key: string): Promise<void> => {
  const path = './src/cache/lol/champion/' + key + '.png';
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(path)) return resolve();
    CDragonApi.get('plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' + key + '.png', {
      responseType: "stream"
    }).then((res: AxiosResponse) => {
      saveImage(res, path).then(() => resolve())
        .catch((err: Error) => reject(err));
    }).catch((err: Error) => reject(err));
  });
}

const cacheChampionSplash = async (key: string): Promise<void> => {
  const path = './src/cache/lol/splash/' + key + '.jpg';
  return new Promise(async (resolve, reject) => {
    CDragonApi.get('plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/' + key + '/' + key + '000.jpg', {
      responseType: "stream"
    }).then((res: AxiosResponse) => {
      saveImage(res, path).then(() => resolve())
        .catch((err: Error) => reject(err));
    }).catch((err: Error) => reject(err));
  });
}

const cachePfp = async (id: string): Promise<void> => {
  const path = './src/cache/lol/pfp/' + id + '.png';
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(path)) return resolve();
    CDragonApi.get('plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/' + id + '.jpg', {
      responseType: "stream"
    }).then((res: AxiosResponse) => {
      saveImage(res, path).then(() => resolve())
        .catch((err: Error) => reject(err));
    }).catch((err: Error) => reject(err));
  });
}


module.exports = {
  getVersion,
  cacheChampionIcon,
  cacheChampionSplash,
  cachePfp,
  getChampionList
}