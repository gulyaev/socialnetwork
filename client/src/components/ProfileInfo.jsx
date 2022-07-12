import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

const ProfileInfo = () => {
    return (
        <div className="profileinfo">
            <div className="profileinfo__avatar">
                <img src={require('../img/logo.jpeg')} alt="avatar" />
            </div>
            <div className="profileinfo__description">
                <Title level={3}>Описание профиля</Title>
            </div>
        </div>
    )
}

export default ProfileInfo