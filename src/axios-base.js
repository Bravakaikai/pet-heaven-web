import axios from "axios";

const axiosBase = axios.create({
  baseURL: "/api",
  // baseURL: process.env.VUE_APP_BASE_SERVER,
});

export default axiosBase;
