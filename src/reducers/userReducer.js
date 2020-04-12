import {SET_USER} from "../actions/userActions"

const user = {}

const userReducer = (
    state = {user: user}, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.user
            }

        default:
            return state
    }
}

export default userReducer
