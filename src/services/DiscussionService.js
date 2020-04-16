import {findAllCourses, findCourseById, updateCourse} from "./CourseService";

export const createDiscussion = (topicId, discussion) =>
    fetch(`http://localhost:8080/api/topics/${topicId}/discussions`, {
        method: 'POST',
        body: JSON.stringify(discussion),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findDiscussionsForTopic = (topicId) => {
    return fetch(`http://localhost:8080/api/topics/${topicId}/discussions`)
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
    findDiscussionsForTopic
}