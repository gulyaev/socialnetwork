import React from "react"
import axios from "axios"
import { Avatar, List } from 'antd';
import Loader from "../../components/Loader"

class UsersPage extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`http://localhost:5000/api/user?currentpage=${this.props.currentPage}&perpage=${this.props.perPage}`).then(res => {
            this.props.setIsFetching(false)
            this.props.setUsers(res.data.results, res.data.totalCount)
        })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page)
        this.props.setIsFetching(true)
        axios.get(`http://localhost:5000/api/user?currentpage=${this.props.currentPage}&perpage=${this.props.perPage}`).then(res => {
            this.props.setIsFetching(false)
            this.props.setUsers(res.data.results, res.data.totalCount)
        })
    }

    render = () => {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.perPage)

        let pages = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div className="userspage">
                {
                this.props.isFetching 
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
                            className={this.props.currentPage == page ? "current-page" : "page"}
                            onClick={() => this.onPageChanged(page)} >
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