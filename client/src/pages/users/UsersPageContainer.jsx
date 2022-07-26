import React from "react";
import {
  setCountUsersPerPageActionCreator,
  setCurrentPageActionCreator,
  setUsersActionCreator,
  setCurrentUserActionCreator,
  setToggleIsFetchingActionCreator,
  getUsersThunkCreator,
} from "../../redux/usersPageReducer";
import {
  getUsersData,
  getTotalUsersCount,
  getPerPage,
  getCurrentPage,
  getIsFetching,
} from "../../redux/usersSelectors";
import { connect } from "react-redux";
import axios from "axios";
import UsersPage from "./UsersPage";
import { userApi } from "../../api/api";

class UsersPageContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.perPage);
  }

  onPageChanged = (page) => {
    this.props.setCurrentPage(page);
    //this.props.setIsFetching(true);
    userApi.getUsers(this.props.currentPage, this.props.perPage).then((res) => {
      //this.props.setIsFetching(false);
      this.props.setUsers(res.data.results, res.data.totalCount);
    });
  };

  clickUserHandler = (id) => {
    this.props.setIsFetching(true);
    userApi.getOneUser(id).then((res) => {
      this.props.setIsFetching(false);
      console.log(res.data);
      this.props.setCurrentUser(res.data);
    });
  };

  render = () => {
    return (
      <UsersPage
        totalUsersCount={this.props.totalUsersCount}
        perPage={this.props.perPage}
        isFetching={this.props.isFetching}
        currentPage={this.props.currentPage}
        usersData={this.props.usersData}
        onPageChanged={this.onPageChanged}
        clickUserHandler={this.props.clickUserHandler}
      />
    );
  };
}

let mapStateToProps = (state) => {
  return {
    usersData: getUsersData(state),
    totalUsersCount: getTotalUsersCount(state),
    perPage: getPerPage(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (usersData, totalCount) =>
      dispatch(setUsersActionCreator(usersData, totalCount)),
    setCurrentUser: (userData) =>
      dispatch(setCurrentUserActionCreator(userData)),
    setCountUsersPerPage: (count) =>
      dispatch(setCountUsersPerPageActionCreator(count)),
    setCurrentPage: (pageNumber) =>
      dispatch(setCurrentPageActionCreator(pageNumber)),
    //setIsFetching: (isFetching) => dispatch(setToggleIsFetchingActionCreator(isFetching)),
    getUsersThunkCreator: (currentPage, perPage) =>
      dispatch(getUsersThunkCreator(currentPage, perPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPageContainer);
