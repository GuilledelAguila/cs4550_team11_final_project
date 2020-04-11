import {FIND_COURSE_BY_ID, FIND_ALL_COURSES} from "../actions/courseActions"

const courses = [
    {id: "0", name: "New Course", description: "New Description"},
]

const coursesReducer = (
    state = {courses: courses}, action) => {
    switch (action.type) {
        case FIND_ALL_COURSES:
            return {
                courses: action.courses
            }

        case FIND_COURSE_BY_ID:
            return {
                courses: state.courses.filter(course => course.id === action.courseId)
            }

        default:
            return state
    }
}

export default coursesReducer