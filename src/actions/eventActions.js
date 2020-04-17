export const FIND_EVENTS = "FIND_EVENTS"
export const ADD_EVENT = "ADD_EVENT"

export const findEvents = (actualEvents) => ({
    type: FIND_EVENTS,
    actualEvents: actualEvents
})

export const addEvent = (newEvent) => ({
    type: ADD_EVENT,
    newEvent: newEvent
})

