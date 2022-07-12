let rerenderEntireTree = () => {
    console.log("state is changed");
}

let state = {
    postsData: [
        { id: 0, text: "Текст поста 1", likesCount: 5, disLikesCount: 3 },
        { id: 1, text: "Текст поста 2", likesCount: 4, disLikesCount: 2 },
        { id: 2, text: "Текст поста 3", likesCount: 3, disLikesCount: 1 }
    ],

    dialogsData: [
        { id: 1, name: "Анна", message: "Привет" },
        { id: 2, name: "Александра", message: "Как дела ?" },
        { id: 3, name: "Вячеслав", message: "Познакомимся" }
    ]
}

window.state = state;

export const addPost = (newPostMessage) => {
    let newPost = {
        id: 3,
        text: newPostMessage,
        likesCount: 53,
        disLikesCount: 3
    };

    state.postsData.push(newPost);
    rerenderEntireTree()
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer
}

export default state