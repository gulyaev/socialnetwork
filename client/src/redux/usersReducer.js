const SET_USERS = 'SET-USERS'

const initialState = {
    usersData: [
        { id: 17, nikname: "nikname1", email: "name1@mail.ru" }
    ],
    currentUser: {},
    isAuth: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return (
                {
                    ...state,
                    usersData: [...state.usersData, action.payload]
                }
            )
        default:
            return state
    }
}

export const setUsersActionCreator = (users) => { return { type: SET_USERS, payload: users } }

export default usersReducer