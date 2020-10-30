import axios from "axios";
import {
    AUTH_HEADER,
    BASE_URL,
    LOCALSTORAGE_TOKEN_KEY
} from "../constants";

const axiosInst = axios.create({
    baseURL: BASE_URL
});

/**
 * @param {string} username 
 * @param {string} password
 * @return {Promise<{ role: string }>}
 */
export async function signIn(username, password) {
    try {
        const response = await axiosInst.post("/sign-in", { username, password });
        const token = response.headers[AUTH_HEADER];
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);

        return response.data;
    }
    catch(err) {
        if (err?.response.status === 401) {
            throw new Error("Неверно введен логин, либо пароль");
        }
        else {
            throw err;
        }
    }
}

/**
 * @typedef User
 * @property {string} username
 * @property {string} password
 * @property {string} name
 * @property {string} surname
 * @property {string} middlename
 * @property {string} email
 * @property {string} dateOfBirth
 * @property {string} role # Temporary
 * 
 * @param {User} user
 */
export async function signUp(user) {
    try {
        const response = await axiosInst.post("/sign-up", user);
        const token = response.headers[AUTH_HEADER];
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
    }
    catch(err) {
        throw err;
    }
}

export async function checkToken() {
    try {
        const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
        if (!token) {
            return false;
        }

        await axiosInst.get("/check-token", { headers: { [AUTH_HEADER]: token } });
        return true;
    }
    catch(err) {
        console.error(err);
        return false;
    }
}
