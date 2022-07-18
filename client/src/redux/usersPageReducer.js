const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_PERPAGE = 'SET-PERPAGE'
const SET_IS_FETCHING = "SET-IS-FETCHING" 

const initialState = {
    usersData: [],
    currentUser: {},
    isAuth: false,
    totalUsersCount: 0,
    perPage: 1,
    currentPage: 1,
    isFetching: true
}

const usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return (
                {
                    ...state,
                    usersData: action.payload.usersData,
                    totalUsersCount: action.payload.totalCount,
                }
            )
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.payload
            }
        }
        default:
            return state
    }
}

export const setUsersActionCreator = (usersData, totalCount) => { return { type: SET_USERS, payload: { usersData, totalCount } } }
export const setCurrentPageActionCreator = (pageNumber) => { return { type: SET_CURRENT_PAGE, payload: pageNumber } }
export const setCountUsersPerPageActionCreator = (count) => { return { type: SET_PERPAGE, payload: count } }
export const setToggleIsFetchingActionCreator = (isFetching) => { return { type: SET_IS_FETCHING, payload: isFetching  } }

export default usersPageReducer