import React, {useEffect} from "react"
import axios from "axios"
import { Avatar, List } from 'antd';

const UsersPageF = (props) => {
        let currentPage = props.currentPage

        useEffect(()=>{
            debugger
            axios.get(`http://localhost:5000/api/user?currentpage=${props.currentPage}&perpage=${props.perPage}`).then(res => {
            props.setUsers(res.data.results, res.data.totalCount)
        })
        console.log("render update");
        }, [currentPage])

        let pagesCount = Math.ceil(props.totalUsersCount / props.perPage)

        let pages = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
debugger
        return (
            <div className="userspage">
                <div className="userspage__pagination">
                    {pages.map((page, index) =>
                        <span key={index}
                            className={props.currentPage == page ? "current-page" : "page"}
                            onClick={() => props.setCurrentPage(page)} >
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
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.nikname}</a>}
                                description={item.email}
                            />
                        </List.Item>
                    )}
                />
            </div>



        )
    
}

export default UsersPageF