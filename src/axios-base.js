import axios from "axios";

const axiosBase = axios.create({
  baseURL: "/api/",
});

export default axiosBase;
