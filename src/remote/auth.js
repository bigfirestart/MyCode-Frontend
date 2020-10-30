import axios from "axios";

const BASE_URL = "localhost:8000";
const LOCALSTORAGE_TOKEN_KEY = "access-token";
const AUTH_HEADER = "Authorization";

const axiosInst = axios.create({
    baseURL: BASE_URL
});

/**
 * @param {string} username 
 * @param {string} password 
 */
export async function signIn(username, password) {
    try {
        const response = await axiosInst.post("/sign-in", { username, password });
        const token = response.headers[AUTH_HEADER];
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
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
