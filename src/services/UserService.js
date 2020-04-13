
export const logout = () =>
    fetch(`http://localhost:8080/logout`, {
        method: 'POST',
        credentials: "include"
    })

export const profile = () =>
    fetch(`http://localhost:8080/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())

export const register = (user) =>
    fetch(`http://localhost:8080/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const login = (user) =>
    fetch(`http://localhost:8080/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const findUsersToValidate = () =>
    fetch(`http://localhost:8080/users/faculty/validate`).then(response => response.json())

export const updateValidateFaculty = (userId) =>
    fetch(`http://localhost:8080/users/faculty/validate/${userId}`, {
        method: 'PUT',
        credentials: "include"
    })

export const updateUnvalidateFaculty = (userId) =>
    fetch(`http://localhost:8080/users/faculty/unvalidate/${userId}`, {
        method: 'PUT',
        credentials: "include"
    })

