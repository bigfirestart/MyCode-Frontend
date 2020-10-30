import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

if (!BASE_URL) {
    throw new Error("REACT_APP_BASE_URL must be provided");
}

export const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true
})
