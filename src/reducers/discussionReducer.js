import {
    ADDING_COMMENT, CANCEL_COMMENT,
    CREATE_DISCUSSION,
    DELETE_DISCUSSION,
    FIND_ALL_DISCUSSIONS_FOR_TOPIC, SAVE_COMMENT,
    UPDATE_DISCUSSIONS
} from "../actions/discussionActions";

const discussions = {
    adding: -1,
    discussions: []
};

const discussionReducer = (

    state = discussions, action) => {
    switch (action.type) {
        case UPDATE_DISCUSSIONS:
            return {
                discussions: state.discussions.map(discussion => discussion.topic === action.topicId ? action.discussion : discussion)
            }
        case DELETE_DISCUSSION:
            return {
                discussions: state.discussions.filter(discussion => discussion.id !== action.discusionId)
            }
        case CREATE_DISCUSSION:
            return {
                discussions: [
                    ...state.discussions,
                    action.discussion
                ]
            }

        case FIND_ALL_DISCUSSIONS_FOR_TOPIC:
            return {
                ...state,
                discussions: action.actualDiscussions
            }

        case ADDING_COMMENT:
            return {
                ...state,
                adding: 0
            }
        case CANCEL_COMMENT:
            return {
                ...state,
                adding: -1
            }
        case SAVE_COMMENT
        :
            return {
                ...state,
                adding: -1,
                discussions: [
                    ...state.discussions,
                    action.discussion
                ]
            }


        default:
            return state
    }
}

export default discussionReducer