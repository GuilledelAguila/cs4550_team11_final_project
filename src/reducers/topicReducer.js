import {FIND_ALL_TOPICS} from "../actions/topicActions";

const topics = [
    {id: "0", title: "Grading"},
    {id: "1", title: "Work Load"},
    {id: "2", title: "Instructor"},
    {id: "3", title: "Content"},

]

const topicReducer = (
    state = {topics: topics}, action) => {
    switch (action.type) {
        case "UPDATE_WIDGET":
            return {
                topics: state.topics.map(topic => topic.id === action.topic.id ? action.topic : topic)
            }

        case FIND_ALL_TOPICS:
            return {
                topics: [...state.topics]
            }
        default:
            return state
    }
}

export default topicReducer