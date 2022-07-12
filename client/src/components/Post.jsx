import React from 'react'

const Post = (props) => {
    return (
        <div className="posts__item item">
            <div className="item__top top">
                <div className="top__image">
                    <img src={require('../img/logo.jpeg')} alt="ava" width="70px" />
                </div>
                <div className="top__post">
                    {props.text}
                </div>
            </div>

            <div className="item__vote vote">
                <div className="vote__likes">
                    <span>like</span>
                    <span>{props.likesCount}</span>
                </div>
                <div className="vote__dislikes">
                    <span>dislike</span>
                    <span>{props.disLikesCount}</span>
                </div>
            </div>
        </div>
    )
}

export default Post