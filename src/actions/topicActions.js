export const UPDATE_TOPIC = "UPDATE_TOPIC"
export const FIND_ALL_TOPICS = "FIND_ALL_TOPICS"

export const updateTopic = (topic) => ({
    type: UPDATE_TOPIC,
    topic: topic
})

export const findAllTopics = () => ({
    type: FIND_ALL_TOPICS
})

