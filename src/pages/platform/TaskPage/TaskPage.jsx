import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getTask } from "../../../remote/api";
import { TaskTab } from "./TaskTab";
import { SubmissionsTab } from "./SubmissionsTab";
import { Link } from "react-router-dom";

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
        return null;
    }

    return <div>
        <h2 className="green-under-line mt-5 mb-2">{task.name}</h2>
        <Link to="/tasks">🠔 К задачам</Link>
        <Tabs onSelect={setTab} activeKey={tab} className="mt-4">
            <Tab title="Задание" eventKey={TASK_TAB}>
                <TaskTab task={task} />
            </Tab>
            <Tab title="Попытки" eventKey={SUBMISSIONS_TAB}>
                <SubmissionsTab submissions={task.submissions} />
            </Tab>
        </Tabs>
    </div>;
}
