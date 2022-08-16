import React from "react";
import Categories from "./Categories";
import { connect } from "react-redux";
import {
  setCategoriesActionCreator,
  setToggleIsFetchingActionCreator,
} from "../../redux/categoriesSidebarReducer";
import { compose } from "redux";
import axios from "axios";

class CategoriesContainer extends React.Component {
  componentDidMount() {
    this.props.setIsFetching(true);
    axios.get("http://localhost:5000/api/categories").then((res) => {
      this.props.setIsFetching(false);
      this.props.setSidebarCategories(res.data);
    });
  }

  render = () => {
    return (
      <Categories categoriesSidebarData={this.props.categoriesSidebarData} />
    );
  };
}

let mapStateToProps = (state) => {
  return {
    categoriesSidebarData: state.categoriesSidebarData,
    isFetching: state.categoriesSidebarData.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setSidebarCategories: (categoriesSidebarData) =>
      dispatch(setCategoriesActionCreator(categoriesSidebarData)),
    setIsFetching: (isFetching) =>
      dispatch(setToggleIsFetchingActionCreator(isFetching)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CategoriesContainer
);
