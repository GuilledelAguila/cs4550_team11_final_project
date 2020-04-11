export const FIND_ALL_COURSES = "FIND_ALL_COURSES"
export const FIND_COURSE_BY_ID = "FIND_COURSE_BY_ID"

export const findAllCourses = (actualCourses) => ({
    type: FIND_ALL_COURSES,
    courses: actualCourses
})

export const findCourseById = (courseId) => ({
    type: FIND_COURSE_BY_ID,
    courseId: courseId
})