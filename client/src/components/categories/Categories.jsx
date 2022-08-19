import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";

class Categories extends React.Component {
  render = () => {
    // if (this.props.isFetching) {
    //     return (
    //         <div className="userspage__loader">
    //         <Loader />
    //         </div>)
    // } else {
    return (
      <div className="sidebar__flex users">
        <div className="users__header">
          <div className="users__title">
            <h4>Категории</h4>
          </div>
        </div>
        <div className="users__items">
          {this.props.categoriesSidebarData.categoriesSidebarData.map(
            (category) => {
              return (
                <div className="users__item">
                  <NavLink
                    to={`/?cat=${category.title.replace(/[\s{}]/g, "")}`}
                    className="users__name"
                  >
                    {category.title.replace(/[\s{}]/g, "")}
                  </NavLink>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  };
}

export default Categories;
