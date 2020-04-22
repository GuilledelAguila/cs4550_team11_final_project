import {API_URL} from "../constants";

export const findEventsForUser = () =>
    fetch(`${API_URL}/api/users/events/`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

export const findEventIdsForUser = () =>
    fetch(`${API_URL}/api/users/events/ids`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

export const deleteEventForUser = (event) =>
    fetch(`${API_URL}/api/users/events/`, {
        method: 'DELETE',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const deleteEvent = (eventId) =>
    fetch(`${API_URL}/api/events/${eventId}`, {
        method: 'DELETE',
        credentials: "include"
    })

export const save = (event) =>
    fetch(`${API_URL}/api/users/events/`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())


export const postEventForCourse = (event, courseId) =>
    fetch(`${API_URL}/api/courses/${courseId}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const findEventsForCourse = (courseId) => {
    return fetch(`${API_URL}/api/courses/${courseId}/events`)
        .then(response => response.json())
}

export const findEventById = (eventId) => {

    return fetch(`${API_URL}/api/events/${eventId}`)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(function(response) {
            return response.json();
        }).catch(function(error) {
            return "ERROR";
        });
}


export default {
    save,
    postEventForCourse,
    findEventsForCourse,
    findEventById
}
