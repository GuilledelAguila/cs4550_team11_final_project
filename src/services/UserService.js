
export const logout = () =>
    fetch(`http://localhost:8080/api/logout`, {
        method: 'POST',
        credentials: "include"
    })

export const profile = () =>
    fetch(`http://localhost:8080/api/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.text()
        .then((text) => text.length ? JSON.parse(text) : null)
    )

export const register = (user) =>
    fetch(`http://localhost:8080/api/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const login = (user) =>
    fetch(`http://localhost:8080/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(function(response) {
        return response.json();
    }).catch(function(error) {
        console.log(error);
    });

export const findUsersToValidate = () =>
    fetch(`http://localhost:8080/api/users/faculty/validate`).then(response => response.json())

export const updateValidateFaculty = (userId) =>
    fetch(`http://localhost:8080/api/users/faculty/validate/${userId}`, {
        method: 'PUT',
        credentials: "include"
    })

export const updateUnvalidateFaculty = (userId) =>
    fetch(`http://localhost:8080/api/users/faculty/unvalidate/${userId}`, {
        method: 'PUT',
        credentials: "include"
    })





// export const logout = () =>
//     fetch(`https://project-springboot-server-t11.herokuapp.com/logout`, {
//         method: 'POST',
//         credentials: "include"
//     })
//
// export const profile = () =>
//     fetch(`https://project-springboot-server-t11.herokuapp.com/profile`, {
//         method: 'POST',
//         credentials: "include"
//     }).then(response => response.json())
//
// export const register = (user) =>
//     fetch(`https://project-springboot-server-t11.herokuapp.com/register`, {
//         method: 'POST',
//         body: JSON.stringify(user),
//         headers: {
//             'content-type': 'application/json'
//         },
//         credentials: "include"
//     }).then(response => response.json())
//
// export const login = (user) =>
//     fetch(`https://project-springboot-server-t11.herokuapp.com/login`, {
//         method: 'POST',
//         body: JSON.stringify(user),
//         headers: {
//             'content-type': 'application/json'
//         },
//         credentials: "include"
//     }).then(response => response.json())
//
// export const findUsersToValidate = () =>
//     fetch(`c/users/faculty/validate`).then(response => response.json())
//
// export const updateValidateFaculty = (userId) =>
//     fetch(`https://project-springboot-server-t11.herokuapp.com/users/faculty/validate/${userId}`, {
//         method: 'PUT',
//         credentials: "include"
//     })
//
// export const updateUnvalidateFaculty = (userId) =>
//     fetch(`https://project-springboot-server-t11.herokuapp.com/users/faculty/unvalidate/${userId}`, {
//         method: 'PUT',
//         credentials: "include"
//     })
