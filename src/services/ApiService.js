import {PROXY_URL} from "../constants";

export const searchEvents = (keywords) =>
    fetch(`${PROXY_URL}/api/event/search?keywords=${keywords}`)
        .then(response => response.json())

export const searchEventDetails = (eventID) =>
    fetch(`${PROXY_URL}/api/searchbyid?id=${eventID}`)
        .then(response => response.json())
