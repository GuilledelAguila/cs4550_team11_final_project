import {API_URL} from "../constants";

export const logout = () =>
    fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: "include"
    })

export const profile = () =>
    fetch(`${API_URL}/api/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.text()
        .then((text) => text.length ? JSON.parse(text) : null)
    )

export const register = (user) =>
    fetch(`${API_URL}/api/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const login = (user) =>
    fetch(`${API_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.text()
        .then((text) => text.length ? JSON.parse(text) : null)
    )

export const findUsersToValidate = () =>
    fetch(`${API_URL}/api/users/faculty/validate`).then(response => response.json())

export const updateValidateFaculty = (userId) =>
    fetch(`${API_URL}/api/users/faculty/validate/${userId}`, {
        method: 'PUT',
        credentials: "include"
    })

export const updateUnvalidateFaculty = (userId) =>
    fetch(`${API_URL}/api/users/faculty/unvalidate/${userId}`, {
        method: 'PUT',
        credentials: "include"
    })



