import Api from "./Api";

export default {
  updateLolAccount(data: {account: string}) {
    return Api().post('account/lol/update', data);
  },
  getLolAccount() {
    return Api().post('account/lol/getaccount');
  },
  getChampionList() {
    return Api().post('account/lol/champions');
  },
  addMainChamp(key: string, number: string) {
    return Api().post('/account/lol/addmain', {key: key, number: number});
  },
  getMainChamps() {
    return Api().post('/account/lol/mainchampions');
  },
  removeMainChamp(number: string) {
    return Api().post('/account/lol/removemain', {number: number});
  },
  updateLolRole(role: number) {
    return Api().post('account/lol/updaterole', {role: role});
  },
  getLolRole() {
    return Api().post('account/lol/getrole');
  }
}