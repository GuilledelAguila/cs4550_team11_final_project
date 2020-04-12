export const SET_USER= "SET_USER"
export const GET_USER="GET_USER"


export const setUser = (newUser) => ({
    type: SET_USER,
    user: newUser
})

export const getUser = () => ({
    type: GET_USER,
})
