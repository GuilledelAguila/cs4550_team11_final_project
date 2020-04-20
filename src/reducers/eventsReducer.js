import {FIND_EVENTS, ADD_EVENT} from "../actions/eventActions";

const events = [
    {
        id: "0",
        title: "Grading",
        address: "Hall 123",
        start_time: "Monday",
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