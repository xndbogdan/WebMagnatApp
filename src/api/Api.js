import axios from "axios";

let Api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

Api.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json"
};

Api.defaults.withCredentials = true;

export default Api;
