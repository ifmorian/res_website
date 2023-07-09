import type { loginCredentials, registerCredentials } from "@/interfaces/interfaces";
import Api from "./Api";

export default {
  register(credentials: registerCredentials) {
    return Api().post('user/register', credentials);
  },
  login(credentials: loginCredentials) {
    return Api().post('user/login', credentials);
  },
  logout() {
    return Api().post('user/logout');
  },
  isloggedin() {
    return Api().post('user/isloggedin');
  },
  setGamertag(gamertag: string) {
    return Api().post('user/setgamertag', {gamertag: gamertag});
  },
  setBio(bio: string) {
    return Api().post('user/setbio', {bio: bio});
  },
  setEmail(email: string) {
    return Api().post('user/setemail', {email: email});
  },
  setPassword(oldPw: string, newPw: string, repeatPw: string) {
    return Api().post('user/setpassword', {old: oldPw, new: newPw, repeat: repeatPw});
  },
  getUserData() {
    return Api().post('user/data');
  }
}