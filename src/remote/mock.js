import { axiosInstance } from "./base"
import MockAdapter from "axios-mock-adapter";

export const mock = new MockAdapter(axiosInstance);

mock.onGet("/tasks").reply(200, [
        {
            groupId: "UUID-1",
            task: {
                id: 1,
                problem: "Task 1",
                deadline: "12-02-20"
            }
        },
        {
            groupId: "UUID-2",
            task: {
                id: 1,
                problem: "Task 2",
                deadline: "12-02-20"
            }
        }
        ]
);
