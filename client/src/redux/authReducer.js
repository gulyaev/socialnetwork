const SET_AUTH_DATA =  'SET-AUTH-DATA'

let initialState = {
    usersId: null,
    email: null,
    nikname: null,
    isAuth: false,
    message: null
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                usersId: action.payload.id, 
                nikname: action.payload.nikname, 
                email: action.payload.email, 
                isAuth: true,
                message: "Аккаунт создан"
            }
        default:
            return state
    }
}

export const setAuthDataActionCreator = (authData) => {return {type: SET_AUTH_DATA, payload: authData}}

export default authReducer