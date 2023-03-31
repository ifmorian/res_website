import axios from "axios";

module.exports = (url: string) => {
  return axios.create({
    baseURL: url
  })
}