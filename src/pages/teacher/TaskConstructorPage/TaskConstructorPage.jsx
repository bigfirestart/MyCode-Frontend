import React, { useState, useEffect } from "react";
import { getTaskTests, getTask } from "../../../remote/api";
import { TaskConstructor } from "../../../components/TaskConstructor/TaskConstructor";

export function TaskConstructorPage({ groupId, taskId }) {
    /** @type {import("../../../remote/api").Task & { tests: import("../../../remote/api").Test[] }} */
    const initTask = taskId
        ? null
        : {
            id: null,
            problem: "",
            name: "",
            tests: [{
                number: 1,
                input: "",
                output: "",
                weight: 100
            }],
            samples: [{
                input: "",
                output: ""
            }],
            deadline: new Date(),
            timeLimit: 1000,
            memoryLimit: 1000,
            testType: "TEST",
            postprocessorType: "EASY",
            submissions: []
        };
    
    const [task, setTask] = useState(initTask);

    useEffect(
        () => {
            if (!taskId) {
                return;
            }

            const fetchTask = async () => {
                const taskData = await getTask(groupId, taskId);
                const tests = await getTaskTests(groupId, taskId);

                setTask({
                    ...taskData,
                    tests
                });
            };

            fetchTask();
        },
        [groupId, taskId]
    );

    return <div>
        <h2 className="green-under-line mt-5">Новое задание</h2>
        <TaskConstructor task={task} setTask={setTask} />
    </div>;
}
