import axios from "axios";
import {BASE_URL} from "../constants.js"

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "http://localhost:3000/api/v1";
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
