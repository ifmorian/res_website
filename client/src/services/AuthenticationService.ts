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
  setGamertag(credentials: {gamertag: string}) {
    return Api().post('user/gamertag', credentials);
  }
}