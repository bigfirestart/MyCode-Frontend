import { axiosInstance } from "./base"
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axiosInstance);

mock.onGet("/tasks").reply(200,"kek");