export const getUsersData = (state) => {
  return state.usersData.usersData;
};

export const getTotalUsersCount = (state) => {
  return state.usersData.totalUsersCount;
};

export const getPerPage = (state) => {
  return state.usersData.perPage;
};

export const getCurrentPage = (state) => {
  return state.usersData.currentPage;
};

export const getIsFetching = (state) => {
  return state.usersData.isFetching;
};
