
export const findAllTopics = () => {
    return fetch(`http://localhost:8080/api/topics`)
        .then(response =>response.json())
}

export const findTopicsForCourse = (courseId) => {
    return fetch(`http://localhost:8080/api/courses/${courseId}/topics`)
        .then(response =>response.json())
}



export default {
    findAllTopics,
    findTopicsForCourse
}