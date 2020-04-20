import {FIND_EVENTS, ADD_EVENT} from "../actions/eventActions";

const events = [
    {
        id: "0",
        title: "Grading",
        location: "Hall 123",
        date: "Monday",
        description:"brief description"
    },
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