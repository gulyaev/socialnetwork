//UsersPage and ProfilePage
import { userApi } from "../api/api";

const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_PERPAGE = "SET-PERPAGE";
const SET_IS_FETCHING = "SET-IS-FETCHING";
const SET_CURRENT_USER = "SET-CURRENT-USER";
const SET_IS_FOLLOWING = "SET-IS-FOLLOWING";

const initialState = {
  usersData: [],
  currentUser: {},
  totalUsersCount: 0,
  perPage: 1,
  currentPage: 1,
  isFetching: true,
  followingInProgress: false,
};

const usersPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        usersData: action.payload.usersData,
        totalUsersCount: action.payload.totalCount,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.payload,
      };
    }
    case SET_IS_FOLLOWING:
      return {
        ...state,
        followingInProgress: action.payload,
      };
    default:
      return state;
  }
};

export const setUsersActionCreator = (usersData, totalCount) => {
  return { type: SET_USERS, payload: { usersData, totalCount } };
};
export const setCurrentUserActionCreator = (userData) => {
  return { type: SET_CURRENT_USER, payload: userData };
};
export const setCurrentPageActionCreator = (pageNumber) => {
  return { type: SET_CURRENT_PAGE, payload: pageNumber };
};
export const setCountUsersPerPageActionCreator = (count) => {
  return { type: SET_PERPAGE, payload: count };
};
export const setToggleIsFetchingActionCreator = (isFetching) => {
  return { type: SET_IS_FETCHING, payload: isFetching };
};
export const setFollowingInProgressActionCreator = (isFollowing) => {
  return { type: SET_IS_FOLLOWING, payload: isFollowing };
};

export const getUsersThunkCreator = (currentPage, perPage) => {
  return (dispatch) => {
    //dispatch(setToggleIsFetchingActionCreator(true));
    userApi.getUsers(currentPage, perPage).then((res) => {
      //dispatch(setToggleIsFetchingActionCreator(false));
      dispatch(setUsersActionCreator(res.data.results, res.data.totalCount));
    });
  };
};

export const updateStatus = (status) => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true));
    userApi.updateStatus(status).then((res) => {
      dispatch(setToggleIsFetchingActionCreator(false));
      dispatch(setCurrentUserActionCreator(res.data));
    });
  };
};

export const setCurrentUser = (userId) => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true));
    userApi.getOneUser(userId).then((res) => {
      dispatch(setToggleIsFetchingActionCreator(false));
      dispatch(setCurrentUserActionCreator(res.data));
    });
  };
};

const followUnfollowFlow = (dispatch, userId, ApiMethod) => {
  dispatch(setFollowingInProgressActionCreator(true));
  ApiMethod(userId).then((res) => {
    dispatch(setFollowingInProgressActionCreator(false));
    console.log(res.data);
  });
};

export const follow = (userId) => {
  return (dispatch) => {
    followUnfollowFlow(dispatch, userId, userApi.follow.bind(userApi));
  };
};

export const unfollow = (userId) => {
  return (dispatch) => {
    followUnfollowFlow(dispatch, userId, userApi.unfollow.bind(userApi));
  };
};

export default usersPageReducer;
