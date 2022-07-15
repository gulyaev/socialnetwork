import React from 'react'
import Post from '../Post'
import { Typography } from 'antd';
const { Title } = Typography;

const MyPosts = (props) => {
    let textareaRef = React.createRef()

    const addPost = () => {
        props.addPost(textareaRef.current.value)
        textareaRef.current.value = '';
    }
    return (
        <div className="myposts">
            <div className="myposts__container">
                <Title level={3}>Мои посты</Title>
                <input type="text" className="myposts__input" placeholder='Что у вас нового ?' ref={textareaRef} />
                <div className="myposts__btn" onClick={addPost}>Добавить пост</div>
                <div className="myposts__posts posts">
                    {
                        props.postsData.postsData.map((post) => {
                            return (
                                <Post text={post.text} likesCount={post.likesCount} disLikesCount={post.disLikesCount} />
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default MyPosts