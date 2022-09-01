import { authApi } from "../api/api";

const SET_REGISTER_DATA = "SET-REGISTER-DATA";
const SET_LOGIN_DATA = "SET-LOGIN-DATA";
const LOGOUT = "LOGOUT";
const SET_IS_FETCHING = "SET-IS-FETCHING";
const SET_ERROR_MESSAGE = "SET-ERROR-MESSAGE";

let initialState = {
  usersId: null,
  email: null,
  nikname: null,
  isAuth: false,
  avatar: null,
  message: null,
  errorMessage: null,
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_DATA:
      return {
        ...state,
        usersId: action.payload.id,
        nikname: action.payload.nikname,
        email: action.payload.email,
        isAuth: true,
        message: "Аккаунт создан",
      };
    case SET_LOGIN_DATA:
      return {
        ...state,
        usersId: action.payload.user.id,
        nikname: action.payload.user.nikname,
        email: action.payload.user.email,
        isAuth: true,
        avatar: action.payload.user.avatar,
        message: "Вы авторизованы",
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        usersId: null,
        nikname: null,
        email: null,
        isAuth: false,
        message: "Вы вышли",
      };
      case SET_IS_FETCHING: {
        return {
          ...state,
          isFetching: action.payload,
        };
      }
      case SET_ERROR_MESSAGE: {
        return {
          ...state,
          errorMessage: action.payload,
        };
      }
    default:
      return state;
  }
};

export const setToggleIsFetchingActionCreator = (isFetching) => {
  return { type: SET_IS_FETCHING, payload: isFetching };
};

export const setErrorMessageActionCreator = (errorMessage) => {
  return { type: SET_ERROR_MESSAGE, payload: errorMessage };
};

export const setRegisterDataActionCreator = (registerData) => {
  return { type: SET_REGISTER_DATA, payload: registerData };
};
export const setLoginDataActionCreator = (loginData) => {
  return { type: SET_LOGIN_DATA, payload: loginData };
};
export const logoutActionCreator = () => {
  return { type: LOGOUT };
};

export const authThunkCreator = () => {
  return (dispatch) => {
    return authApi
      .auth()
      .then((res) => {
        dispatch(setLoginDataActionCreator(res.data));
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        console.log(err);
        console.log(err.response.data.message);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true))
    return authApi
      .login(email, password)
      .then((res) => {
        dispatch(setLoginDataActionCreator(res.data));
        localStorage.setItem("token", res.data.token);
        dispatch(setToggleIsFetchingActionCreator(false))
      })
      .catch((err) => {
        localStorage.removeItem("token");
        console.log(err);
        console.log("err.response.data.message ", err.response.data.message);
        dispatch(setErrorMessageActionCreator(err.response.data.message))
        dispatch(setToggleIsFetchingActionCreator(false))
      });
  };
};

export const register = (email, nikname, password) => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true))
    return authApi
      .register(email, nikname, password)
      .then((res) => {
        dispatch(setRegisterDataActionCreator(res.data));
        dispatch(setToggleIsFetchingActionCreator(false))
      })
      .catch((err) => {
        console.log(err);
        console.log("err.response.data.message ", err.response.data.message);
        for(let i=0; i<err.response.data.errors.errors.length; i++) {
          console.log("err.response.data.errors i ", err.response.data.errors.errors[i].msg);
        }
        dispatch(setErrorMessageActionCreator(err.response.data.message))
        dispatch(setToggleIsFetchingActionCreator(false))
      });
  };
};

export default authReducer;
