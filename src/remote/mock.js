import {axiosInstance} from "./base"
import MockAdapter from "axios-mock-adapter";

export const mock = new MockAdapter(axiosInstance);

mock.onGet("/groups/1/tasks/2").reply(200, JSON.stringify({
    id: 2,
    name: "A+B",
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
    submissions: [
        {
            id: "1",
            timestamp: new Date(),
            points: 10,
            status: "RE",
            errors: [
                {
                    failedTest: 1,
                    status: "TL"
                },
                {
                    failedTest: 2,
                    status: "TL"
                }
            ]
        },
        {
            id: "2",
            timestamp: new Date(),
            points: 80,
            status: "RE",
            errors: [
                {
                    failedTest: 3,
                    status: "RE"
                }
            ]
        },
        {
            id: "3",
            timestamp: new Date(),
            points: 80,
            status: "OK",
            errors: []
        }
    ]
}));

mock.onGet("/tasks").reply(200, [
        {
            groupId: "1",
            task: {
                id: 1,
                name: "Task 1",
                problem: "Task 1 problem",
                deadline: "12-02-20"
            }
        },
        {
            groupId: "2",
            task: {
                id: 2,
                name: "Task 2",
                problem: "Task 2 problem",
                deadline: "12-02-20"
            }
        }
    ]
);
mock.onGet(/\/groups\/([A-Za-z]|[0-9]|-)\/tasks/).reply(200, [
    {
        name: "Task 1"
    },
    {
        name: "Task 2"
    }
    ]
);

mock.onGet(/\/tasks\/([A-Za-z]|[0-9])\|/ ).reply(200, {
        name: "Task Mock Name"
    }
);


mock.onGet("/groups").reply(200, [
    {
        id: "1",
        name: "M3101"
    },
    {
        id: "2",
        name: "M3102"
    },
    {
        id: "3",
        name: "M3103"
    }]
);

mock.onGet(/\/groups\/[a-zA-Z0-9()]/).reply(200, {
        id: "group-uuid-1",
        name: "Group Mock Name",
        students: ['UUID-st-1', 'UUID-st-2', 'UUID-st-2' ]
    }
);
