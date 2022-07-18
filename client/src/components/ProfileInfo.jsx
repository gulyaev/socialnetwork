import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

const ProfileInfo = (props) => {
    return (
        <div className="profileinfo">
            <div className="profileinfo__avatar">
                <img src={require('../img/logo.jpeg')} alt="avatar" />
            </div>
            <div className="profileinfo__description">
                <div className="profileinfo__nikname">{props.currentUser.nikname}</div>
                <div className="profileinfo__mail">Почта для связи: {props.currentUser.email}</div>
            </div>
        </div>
    )
}

export default ProfileInfo