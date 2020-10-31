import {axiosInstance} from "./base"

/**
 * @typedef Group
 * @property {string} id
 * @property {string} name
 * @property {string[]} students UUID[] # ids, only for teachers
 * 
 * @typedef Task
 * @property {string} id
 * @property {string} problem
 * @property {{ input: string, output: string }[]} samples
 * @property {Date} deadline
 * @property {number} timeLimit
 * @property {number} memoryLimit
 * @property {"TEST"|"VALIDATION"} testType
 * @property {"EASY"|"HARD"} postprocessorType
 * @property {SubmissionResult[]} submissions
 *
 * @typedef ShortTask
 * @property {string} id
 * @property {string} problem
 * @property {Date} deadline
 *
 * @typedef GroupTask
 * @property {string} groupId
 * @property {ShortTask} task
 *
 * @typedef Error
 * @property {number} failedTest
 * @property {"CE"|"TL"|"ML"|"RE"} status
 *
 * @typedef SubmissionResult
 * @property {string} taskId
 * @property {Date} timestamp
 * @property {number} points: int
 * @property {"CE"|"TL"|"ML"|"RE"|"OK"|"STYLE_ERROR"} status
 * @property {Error[]} errors
 *
 * @typedef Test
 * @property {number} number
 * @property {string} input
 * @property {string} output
 * @property {number} weight
 * 
 * @typedef {import("./auth").User} User 
 */

//groups
/**
 * @return {Promise<Group[]>}
 */
export async function getGroupsList() {
    try {
        const response = await axiosInstance.get(`/groups`);
        return response.data
    } catch (err) {
        return err;
    }
}

/**
 * @param {string} groupId
 * @return {Promise<Group>}
 */
export async function getGroup(groupId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}`);
        return response.data
    } catch (err) {
        return err;
    }
}

//How about
/**
 * @param {Group} group
 * @return {Promise<Group>}
 */
export async function postGroup(group) {
    try {
        const response = await axiosInstance.post(`/groups`);
        return response.data
    } catch (err) {
        return err;
    }
}

//tasks
/**
 * @return {Promise<GroupTask[]>}
 */
export async function getTasksList() {
    try {
        const response = await axiosInstance.get(`/tasks`);
        return response.data
    } catch (err) {
        return err;
    }
}

/**
 * @param {string} groupId
 * @param {string} taskId
 * @return {Promise<Task>}
 */
export async function getTask(groupId, taskId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/tasks/${taskId}`);
        return response.data
    } catch (err) {
        return err;
    }
}

/**
 * @param {string} taskId
 * @return {Promise<Test[]>}
 */
export async function getTaskTests(groupId, taskId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/tasks/${taskId}/tests`);
        return response.data;
    }
    catch(err) {
        return err;
    }
}

/**
 * @param {string} groupId
 * @return {Promise<Task[]>}
 */
export async function getGroupTasksList(groupId) {
    try {
        const response = await axiosInstance.get(`groups/${groupId}/tasks/`);
        return response.data
    } catch (err) {
        return err;
    }
}

//submissions
/**
 * @param {string} groupId
 * @param {string} taskId
 * @return {Promise<SubmissionResult[]>}
 */
export async function getTaskSubmissions(groupId, taskId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/tasks/${taskId}/submissions`);
        return response.data
    } catch (err) {
        return err;
    }
}

/**
 * @param {string} groupId
 * @param {string} taskId
 * @param {string} submissionId
 * @return ?
 */
export async function getTaskSubmissionCode(groupId, taskId, submissionId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/tasks/${taskId}/submissions/${submissionId}/code`);
        return response.data
    } catch (err) {
        return err;
    }
}


//students
/**
 * @param {string} groupId
 * @return {Promise<User[]>}
 */
export async function getGroupStudents(groupId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/students`);
        return response.data
    } catch (err) {
        return err;
    }
}

/**
 * @param {string} groupId
 * @param {string} studentId
 * @return {Promise<User>}
 */
export async function getStudent(groupId, studentId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/students/${studentId}`);
        return response.data
    } catch (err) {
        return err;
    }
}

/**
 * @param {string} groupId
 * @param {string} studentId
 */
export async function setGroupToStudent(groupId, studentId) {
    try {
        await axiosInstance.post(`/groups/${groupId}/students`, {
                params: {
                    id: studentId
                }
            }
        );
    } catch (err) {
        return err;
    }
}
