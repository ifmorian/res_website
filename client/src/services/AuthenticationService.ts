import type { loginCredentials, registerCredentials } from "@/interfaces/interfaces";
import Api from "./Api";

export default {
  register(credentials: registerCredentials) {
    return Api().post('register', credentials);
  },
  login(credentials: loginCredentials) {
    return Api().post('login', credentials);
  },
  logout() {
    return Api().post('logout');
  },
  isloggedin() {
    return Api().post('user/isloggedin');
  },
}