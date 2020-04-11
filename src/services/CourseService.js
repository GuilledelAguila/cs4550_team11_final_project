import {API_URL} from "../constants";


/* createCourse(course) -> creates a new course instance and adds it to the collection of courses */
export const createCourse = (course) =>
    fetch(`http://localhost:8080/api/courses`, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

/*
findAllCourses() -> retrieves all course instances as an array of courses */
export const findAllCourses = () => {
    return fetch(`http://localhost:8080/api/courses`)
        .then(response =>response.json())
}


/* findCourseById(id) -> retrieves a course instance that matches the id parameter*/
export const findCourseById = async (courseId) => {
    const response = await fetch(`http://localhost:8080/api/courses/${courseId}`)
    return await response.json()
}


export const updateCourse = async (id, course) => {
    return fetch(`${API_URL}/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

export const deleteCourse = async (courseId) =>
{
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: 'DELETE'
    })
    return await response.json()
}





export default {
    findAllCourses,
    findCourseById
}