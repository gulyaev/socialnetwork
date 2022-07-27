import React from "react";
import Loader from "../../components/Loader";
import Paginator from "../../components/userspage/Paginator";
import UsersList from "../../components/userspage/UsersList";

const UsersPage = ({
  totalUsersCount,
  perPage,
  isFetching,
  currentPage,
  onPageChanged,
  usersData,
  clickUserHandler,
  ...props
}) => {
  return (
    <div className="userspage">
      {props.isFetching ? (
        <div className="userspage__loader">
          <Loader />
        </div>
      ) : null}
      <Paginator
        totalUsersCount={totalUsersCount}
        perPage={perPage}
        isFetching={isFetching}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      {<UsersList usersData={usersData} clickUserHandler={clickUserHandler} />}
    </div>
  );
};

export default UsersPage;
