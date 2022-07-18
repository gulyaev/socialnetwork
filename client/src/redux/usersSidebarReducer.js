const SET_SIDEBAR_USERS = 'SET-SIDEBAR-USERS'

const initialState = {
    usersSidebarData: [],
    currentUser: {},
    isAuth: false
}

const usersSidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_USERS:
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

export const setUsersActionCreator = (usersSidebarData) => { return { type: SET_SIDEBAR_USERS, payload: usersSidebarData } }

export default usersSidebarReducer