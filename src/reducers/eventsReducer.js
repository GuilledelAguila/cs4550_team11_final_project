import {FIND_EVENTS, ADD_EVENT} from "../actions/eventActions";

const events = [
    {id: "0", title: "Grading"},
    {id: "1", title: "Work Load"},
    {id: "2", title: "Instructor"},
    {id: "3", title: "Content"},
]

const eventsReducer = (state = {events: events}, action) => {
    switch (action.type) {
        case FIND_EVENTS:
            return {
                events: action.actualEvents
            }

        case ADD_EVENT:
            return {
                events: [
                    ...state.events,
                    action.newEvent
                ]
            }
        default:
            return state
    }
}

export default eventsReducer