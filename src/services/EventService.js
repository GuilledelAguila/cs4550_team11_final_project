
export const findEventsForUser = () =>
    fetch(`http://localhost:8080/api/users/events/`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

export const findEventIdsForUser = () =>
    fetch(`http://localhost:8080/api/users/events/ids`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

export const deleteEventForUser = (event) =>
    fetch(`http://localhost:8080/api/users/events/`, {
        method: 'DELETE',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const save = (event) =>
    fetch(`http://localhost:8080/api/users/events/`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())


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
