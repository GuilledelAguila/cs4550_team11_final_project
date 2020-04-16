import {
    ADDING_COMMENT, CANCEL_COMMENT,
    CREATE_DISCUSSION,
    DELETE_DISCUSSION,
    FIND_ALL_DISCUSSIONS_FOR_TOPIC, SAVE_COMMENT,
    UPDATE_DISCUSSIONS
} from "../actions/discussionActions";

const discussions = {
    adding: -1,
    discussions: [
    {id: "123", title: "I had a great experience!!",
        body:"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.", topic:"1", user:"Ann"},
    {id: "124", title: "Great class but a lot of work...",
        body:"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.", topic:"1", user:"Ben"},
    {id: "125", title: "Very useful!!",
        body:"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.", topic:"3", user:"Jerry"},
    {id: "126", title: "Could have been better organized" ,
        body:"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.",topic:"3", user:"Leslie"},
    {id: "127", title: "Very strict grading!",
        body:"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.", topic:"0", user:"Andy"},
    {id: "128", title: "Very good instructor",
        body:"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.", topic: "4", user:"April"}]
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