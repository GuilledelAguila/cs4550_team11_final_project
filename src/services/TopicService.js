import {API_URL} from "../constants";

export const findAllTopics = () => {
    return fetch(`${API_URL}/api/topics`)
        .then(response =>response.json())
}

export const findTopicsForCourse = (courseId) => {
    return fetch(`${API_URL}/api/courses/${courseId}/topics`)
        .then(response =>response.json())
}



export default {
    findAllTopics,
    findTopicsForCourse
}

