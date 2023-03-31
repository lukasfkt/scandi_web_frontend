import axios from "axios";

export const api = axios.create({
  baseURL: "http://54.94.214.17:8080",
});
