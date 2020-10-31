import axios from "axios";
import { AUTH_HEADER, BASE_URL, LOCALSTORAGE_TOKEN_KEY } from "../constants";

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
        config.headers[AUTH_HEADER] = token;
        return config;
    }
);
