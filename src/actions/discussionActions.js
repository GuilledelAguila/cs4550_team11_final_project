export const UPDATE_DISCUSSIONS = "UPDATE_DISCUSSIONS";
export const DELETE_DISCUSSION = "DELETE_DISCUSSION";
export const CREATE_DISCUSSION = "CREATE_DISCUSSION";
export const FIND_ALL_DISCUSSIONS_FOR_TOPIC =  "FIND_ALL_DISCUSSIONS_FOR_TOPIC";
export const ADDING_COMMENT = "ADDING_COMMENT";
export const CANCEL_COMMENT = "CANCEL_COMMENT";
export const SAVE_COMMENT = "SAVE_COMMENT";

export const updateDiscussion = (topic, discussion) => ({
    type: UPDATE_DISCUSSIONS,
    topicId: topic,
    discussion: discussion,
})

export const deleteDiscussion = (discussion) => ({
    type: DELETE_DISCUSSION,
    discussionId: discussion
})

export const createDiscussion = (discussion) => ({
    type: CREATE_DISCUSSION,
    discussion: discussion
})

export const findAllDiscussionsForTopic = (actualDiscussions) => ({
    type: FIND_ALL_DISCUSSIONS_FOR_TOPIC,
    actualDiscussions: actualDiscussions
})

export const addComment = () => ({
    type: ADDING_COMMENT
})

export const cancelComment = () => ({
    type: CANCEL_COMMENT
})

export const saveComment = (discussion) => ({
    type: SAVE_COMMENT,
    discussion: discussion
})

