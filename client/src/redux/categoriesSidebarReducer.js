const SET_SIDEBAR_CATEGORIES = "SET-SIDEBAR-CATEGORIES";
const SET_IS_FETCHING = "SET-IS-FETCHING";

const initialState = {
  categoriesSidebarData: [],
  isFetching: false,
};

const categoriesSidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_CATEGORIES:
      return {
        ...state,
        categoriesSidebarData: action.payload,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
};

export const setCategoriesActionCreator = (categoriesSidebarData) => {
  return { type: SET_SIDEBAR_CATEGORIES, payload: categoriesSidebarData };
};
export const setToggleIsFetchingActionCreator = (isFetching) => {
  return { type: SET_IS_FETCHING, payload: isFetching };
};

export default categoriesSidebarReducer;
