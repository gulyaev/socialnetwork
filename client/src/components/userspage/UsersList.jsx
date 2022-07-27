import React from "react";
import { Avatar, List } from "antd";
import { NavLink } from "react-router-dom";

const UsersList = ({ usersData, clickUserHandler, ...props }) => {
  return (
    <div className="userspage">
      <List
        itemLayout="horizontal"
        dataSource={usersData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              key={item.id}
              avatar={
                <NavLink to={"/profile/" + item.id}>
                  <Avatar
                    onClick={() => clickUserHandler(item.id)}
                    src="https://joeschmoe.io/api/v1/random"
                  />{" "}
                </NavLink>
              }
              title={
                <NavLink
                  to={"/profile/" + item.id}
                  onClick={() => {
                    clickUserHandler(item.id);
                  }}
                >
                  {item.nikname}
                </NavLink>
              }
              description={item.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UsersList;
