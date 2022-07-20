const SET_SIDEBAR_USERS = 'SET-SIDEBAR-USERS'
const SET_IS_FETCHING = "SET-IS-FETCHING"

const initialState = {
    usersSidebarData: [],
    currentUser: {},
    isFetching: false
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
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }    
        default:
            return state
    }
}

export const setUsersActionCreator = (usersSidebarData) => { return { type: SET_SIDEBAR_USERS, payload: usersSidebarData } }
export const setToggleIsFetchingActionCreator = (isFetching) => { return { type: SET_IS_FETCHING, payload: isFetching  } }

export default usersSidebarReducer