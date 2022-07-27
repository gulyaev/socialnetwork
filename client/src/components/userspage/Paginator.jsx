import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Pagination } from "antd";

const Paginator = ({
  totalUsersCount,
  perPage,
  currentPage,
  onPageChanged,
}) => {
  const [current, setCurrent] = useState(2);

  const onChange = (page) => {
    setCurrent(page);
    onPageChanged(page);
  };

  let pagesCount = Math.ceil(totalUsersCount / perPage);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className="userspage__pagination">
      <div>
        <p></p>
      </div>
      <Pagination current={current} total={50} onChange={onChange} />
    </div>
  );
};

export default Paginator;
