import {API_URL} from "../constants";


import {findAllCourses, findCourseById, updateCourse} from "./CourseService";

export const createDiscussion = (topicId, discussion) =>
    fetch(`${API_URL}/api/topics/${topicId}/discussions`, {
        method: 'POST',
        body: JSON.stringify(discussion),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    })
        .then(response => response.json())

export const findUsersForTopic = (topicId) =>
    fetch(`${API_URL}/api/topics/${topicId}/users`, {
        method: 'POST',
    })
        .then(response => response.json())

export const findDiscussionsForTopic = (topicId) => {
    return fetch(`${API_URL}/api/topics/${topicId}/discussions`)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(function(response) {
            return response.json();
        }).catch(function(error) {
            console.log(error);
        });
}


export default {
    createDiscussion,
    findDiscussionsForTopic,
    findUsersForTopic
}

