

export const save = (event) =>
    fetch(`http://localhost:8080/users/events/`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => console.log(response))


export const postEventForCourse = (event, courseId) =>
    fetch(`http://localhost:8080/api/courses/${courseId}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const findEventsForCourse = (courseId) => {
    return fetch(`http://localhost:8080/api/courses/${courseId}/events`)
        .then(response => response.json())
}


export default {
    save,
    postEventForCourse,
    findEventsForCourse
}
