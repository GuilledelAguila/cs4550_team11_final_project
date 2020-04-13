import {FIND_COURSE_BY_ID, FIND_ALL_COURSES} from "../actions/courseActions"


const initialState = {
    courses: [
        {id: "0", name: "New Course", description: "New Description"},
    ],
}


const coursesReducer = (state = initialState, action) => {

    switch (action.type) {
        case FIND_ALL_COURSES:
            return {
                course: state.course,
                courses: action.courses,
                editBriefDescription: false,
            }

        case FIND_COURSE_BY_ID:
            return {
                course: state.course,
                courses: state.courses.filter(course => course.id === action.courseId),
                editBriefDescription: false,
            }

        default:
            return state
    }
}

export default coursesReducer