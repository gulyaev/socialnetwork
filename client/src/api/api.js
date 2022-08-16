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

  getStatus(userId) {
    return axios.get(baseURL + `status`);
  },

  updateStatus(status) {
    const bodyParameters = {
      status,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    return axios.put(baseURL + `user/status`, bodyParameters, config);
  },

  follow(userId) {
    const bodyParameters = {
      id: userId,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    return axios.put(baseURL + `follow`, bodyParameters, config);
  },

  unfollow(userId) {
    const bodyParameters = {
      id: userId,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    return axios.put(baseURL + `unfollow`, bodyParameters, config);
  },
};

export const postApi = {
  getPostsByUser() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return axios.get(baseURL + `post`, config);
  },

  getSinglePost(postId) {
    // const config = {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // };
    return axios.get(
      baseURL + `post/${postId}`
      //config
    );
  },
};

export const authApi = {
  auth() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return axios.get(baseURL + `auth`, config);
  },
};
