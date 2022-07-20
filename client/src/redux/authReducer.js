const SET_REGISTER_DATA =  'SET-REGISTER-DATA'
const SET_LOGIN_DATA =  'SET-LOGIN-DATA'

let initialState = {
    usersId: null,
    email: null,
    nikname: null,
    isAuth: false,
    message: null
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_REGISTER_DATA:
            return {
                ...state,
                usersId: action.payload.id, 
                nikname: action.payload.nikname, 
                email: action.payload.email, 
                isAuth: true,
                message: "Аккаунт создан"
            }
        case SET_LOGIN_DATA:
            return {
                ...state,
                usersId: action.payload.user.id, 
                nikname: action.payload.user.nikname, 
                email: action.payload.user.email, 
                isAuth: true,
                message: "Вы авторизованы"
            }
        default:
            return state
    }
}

export const setRegisterDataActionCreator = (registerData) => { return {type: SET_REGISTER_DATA, payload: registerData} }
export const setLoginDataActionCreator = (loginData) => { return {type: SET_LOGIN_DATA, payload: loginData} }

export default authReducer