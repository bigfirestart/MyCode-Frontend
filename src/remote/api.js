import {axiosInstance} from "./base"

//groups
export async function getGroupsList() {
    try {
        const response = await axiosInstance.get(`/groups`);
        return response.data
    } catch (err) {
        return err;
    }
}

export async function getGroup(groupId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}`);
        return response.data
    } catch (err) {
        return err;
    }
}


//tasks
export async function getTasksList(groupId) {
    try {
        const response = await axiosInstance.get(`/tasks`);
        return response.data
    } catch (err) {
        return err;
    }
}

export async function getTask(groupId, taskId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/tasks/${taskId}`);
        return response.data
    } catch (err) {
        return err;
    }
}

//submissions
export async function getTaskSubmissions(groupId, taskId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/tasks/${taskId}/submissions`);
        return response.data
    } catch (err) {
        return err;
    }
}

export async function getTaskSubmissionCode(groupId, taskId, submissionId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/tasks/${taskId}/submissions/${submissionId}/code`);
        return response.data
    } catch (err) {
        return err;
    }
}


//students
export async function getGroupStudents(groupId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/students`);
        return response.data
    } catch (err) {
        return err;
    }
}

export async function getStudent(groupId, studentId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/students/${studentId}`);
        return response.data
    } catch (err) {
        return err;
    }
}

export async function setGroupToStudent(groupId, studentId) {
    try {
        const response = await axiosInstance.post(`/groups/${groupId}/students`, {
                params: {
                    id: studentId
                }
            }
        );
        return response.data
    } catch (err) {
        return err;
    }
}



