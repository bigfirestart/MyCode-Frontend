import {axiosInstance} from "./base"
import MockAdapter from "axios-mock-adapter";

export const mock = new MockAdapter(axiosInstance);

mock.onGet("/tasks").reply(200, [
        {
            groupId: "UUID-1",
            task: {
                id: 1,
                name: "Task 1",
                problem: "Task 1 problem",
                deadline: "12-02-20"
            }
        },
        {
            groupId: "UUID-2",
            task: {
                id: 2,
                name: "Task 2",
                problem: "Task 2 problem",
                deadline: "12-02-20"
            }
        }
    ]
);

mock.onGet("/groups").reply(200, [
    {
        id: "UUID-1",
        name: "M3101"
    },
    {
        id: "UUID-2",
        name: "M3102"
    },
    {
        id: "UUID-3",
        name: "M3103"
    }]
);

mock.onGet("/groups/1/tasks/2").reply(200, {
    id: 2,
    problem: "### Hello world\n Task description \n\n Task description \n\n **Byertrt**",
    samples: [
        {
            input: "3\n1 2 3",
            output: "3 2 1"
        },
        {
            input: "3\n1 2 3",
            output: "3 2 1"
        }
    ],
    deadline: new Date(),
    timeLimit: 2,
    memoryLimit: 1,
    testType: "TEST",
    postprocessorType: "EASY",
    submissions: []
});
