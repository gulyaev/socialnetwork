import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setLoginDataActionCreator } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        this.props.login(res.data);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        console.log(err);
        console.log(err.response.data.message);
        //alert(err.response.data.message);
      });
  }
  render = () => {
    return <Header />;
  };
}

let mapStateToProps = (state) => {
  return {};
};

let mapDispatchToProps = (dispatch) => {
  return {
    login: (authData) => {
      dispatch(setLoginDataActionCreator(authData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
