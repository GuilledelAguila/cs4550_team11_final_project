import {SET_USER, GET_USER} from "../actions/userActions"

const user = {}

const userReducer = (state = {user: user}, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.user
            }

        case GET_USER:
            return {
                user: state.user
            }
        default:
            return state
    }
}

export default userReducer
