const SET_USERS = 'SET-USERS'


const initialState = {
    usersSidebarData: [],
    currentUser: {},
    isAuth: false
}

const usersSidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return (
                {
                    ...state,
                    usersSidebarData: action.payload
                }
            )
        default:
            return state
    }
}

export const setUsersActionCreator = (usersSidebarData) => {
    debugger
    return { type: SET_USERS, payload: usersSidebarData }
}

export default usersSidebarReducer