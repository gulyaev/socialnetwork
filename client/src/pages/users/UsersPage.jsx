import React from "react"
import { Avatar, List } from 'antd';
import { NavLink } from 'react-router-dom'
import Loader from "../../components/Loader"

const UsersPage = (props) => {
        let pagesCount = Math.ceil(props.totalUsersCount / props.perPage)

        let pages = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        
        return (
            <div className="userspage">
                {
                props.isFetching 
                ? 
                <div className="userspage__loader">
                <Loader />
                </div>
                :
                null
                }
                
                
                <div className="userspage__pagination">
                    {pages.map((page, index) =>
                        <span key={index}
                            className={props.currentPage == page ? "current-page" : "page"}
                            onClick={() => props.onPageChanged(page)} >
                            {page}
                        </span>
                    )}
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={props.usersData.usersData}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<NavLink to={"/profile/"+item.id}><Avatar onClick={()=>props.clickUserHandler(item.id)} src="https://joeschmoe.io/api/v1/random" /> </NavLink>}
                                title={<NavLink to={"/profile/"+item.id} onClick={()=>{props.clickUserHandler(item.id)}}>{item.nikname}</NavLink>}
                                description={item.email}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
}

export default UsersPage