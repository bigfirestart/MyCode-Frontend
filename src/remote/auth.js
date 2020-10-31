import axios from "axios";
import {
    AUTH_HEADER,
    BASE_URL,
    LOCALSTORAGE_TOKEN_KEY,
    TEACHER_ROLE
} from "../constants";
import MockAdapter from "axios-mock-adapter";

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

const mock = new MockAdapter(axiosInst);

mock.onPost("/sign-in").reply(200, { role: TEACHER_ROLE }, { [AUTH_HEADER]: "bla-bla-bla" });
mock.onPost("/sign-up").reply(200, {}, { [AUTH_HEADER]: "bla-bla-bla" });
mock.onGet("/check-token").reply(400);
