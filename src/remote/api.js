import {axiosInstance} from "./base"

/**
 * SignInRequest {
  username
  password
}

User {
  id
  username
  password
  name
  surname
  middlename
  email
  dateOfBirth
  role # Temporary
}

Task {
  id
  problem
  samples [
    {
      input
      output
    }
  ]
  deadline: Date
  timeLimit
  memoryLimit
  testType: TEST/VALIDATION
  postprocessorType: EASY/HARD
  submissions: SubmissionResult[]
}

SubmissionResult {
  taskId: UUID
  timestamp: Date
  status: CE/TL/ML/RE/OK/STYLE_ERROR
  errors: [
    {
      failedTest: int
      status: CE/TL/ML/RE
    }
  ]
}

Test {
  number
  input
  output
  weight
}

Validation {
  generator
  validator
  testCount
}
 */

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
 */

//groups
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
 */
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



