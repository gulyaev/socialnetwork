import axios from "axios";
const baseURL = `http://localhost:5000/api/`;

export const userApi = {
  getUsers(currentPage, perPage) {
    return axios.get(
      baseURL + `user?currentpage=${currentPage}&perpage=${perPage}`
    );
  },

  getOneUser(userId) {
    return axios.get(baseURL + `user/${userId}`);
  },
};
