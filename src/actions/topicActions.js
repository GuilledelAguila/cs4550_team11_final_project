export const UPDATE_TOPIC = "UPDATE_TOPIC"
export const FIND_ALL_TOPICS = "FIND_ALL_TOPICS"
export const FIND_TOPICS_FOR_COURSE = "FIND_TOPICS_FOR_COURSE"

export const updateTopic = (topic) => ({
    type: UPDATE_TOPIC,
    topic: topic
})

export const findAllTopics = () => ({
    type: FIND_ALL_TOPICS
})

export const findTopicsForCourse = (topics) => ({
    type: FIND_TOPICS_FOR_COURSE,
    actualTopics: topics
})

