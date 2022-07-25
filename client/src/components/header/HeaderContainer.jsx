import React from "react";
import Header from "./Header";
import { connect } from "react-redux";

class HeaderContainer extends React.Component {
  render = () => {
    return <Header />;
  };
}

export default connect(null, null)(HeaderContainer);
