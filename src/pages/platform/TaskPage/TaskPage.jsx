import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getTask } from "../../../remote/api";
import { TaskTab } from "./TaskTab";
import { SubmissionsTab } from "./SubmissionsTab";

const TASK_TAB = "task-tab";
const SUBMISSIONS_TAB = "submissions-tab";

export function TaskPage({ groupId, taskId }) {    
    const [tab, setTab] = useState(TASK_TAB);
    const [task, setTask] = useState(null);

    useEffect(
        () => {
            const fetchTasks = async () => {
                const task = await getTask(groupId, taskId);
                setTask(task);
            };

            fetchTasks();
        },
        [groupId, taskId]
    );

    

    if (!task) {
        return <div>
            Загрузка
        </div>;
    }

    return <div>
        <h2 className="mt-5 green-under-line mb-4">{task.name}</h2>
        <Tabs onSelect={setTab} activeKey={tab}>
            <Tab title="Задание" eventKey={TASK_TAB}>
                <TaskTab task={task} />
            </Tab>
            <Tab title="Попытки" eventKey={SUBMISSIONS_TAB}>
                <SubmissionsTab submissions={task.submissions} />
            </Tab>
        </Tabs>
    </div>;
}
