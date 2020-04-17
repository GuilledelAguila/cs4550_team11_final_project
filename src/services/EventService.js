import {findAllTopics, findTopicsForCourse} from "./TopicService";

export const save = (event) =>
    fetch(`http://localhost:8080/users/events/`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export default {
    save
}
