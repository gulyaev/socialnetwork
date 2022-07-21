import axios from "axios";
const baseURL = `http://localhost:5000/api/`;

export const getUsers = (currentPage, perPage) => {
  return axios.get(
    baseURL + `user?currentpage=${currentPage}&perpage=${perPage}`
  );
};

export const getOneUser = (userId) => {
  return axios.get(baseURL + `user/${userId}`);
};
