import {axiosInstance} from "./base"
import {NetworkError} from "./errors";

export async function getTasksList(){
    try {
        const response = await axiosInstance.get(`/groups/${id}/`);
    }
    catch(err) {
        return new NetworkError();
    }
}