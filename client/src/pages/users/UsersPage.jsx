import React from "react"
import axios from "axios"
import { Avatar, List } from 'antd';

class UsersPage extends React.Component {
    componentDidMount() {
        axios.get(`http://localhost:5000/api/user?currentpage=${this.props.currentPage}&perpage=${this.props.perPage}`).then(res => {
            this.props.setUsers(res.data.results, res.data.totalCount)
        })
    }

    componentDidUpdate() {
        axios.get(`http://localhost:5000/api/user?currentpage=${this.props.currentPage}&perpage=${this.props.perPage}`).then(res => {
            this.props.setUsers(res.data.results, res.data.totalCount)
        })

    }


    render = () => {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.perPage)

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
                            className={this.props.currentPage == page ? "current-page" : "page"}
                            onClick={() => this.props.setCurrentPage(page)} >
                            {page}
                        </span>
                    )}
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.usersData.usersData}
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
}

export default UsersPage