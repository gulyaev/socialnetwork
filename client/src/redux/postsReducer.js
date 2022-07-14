const ADD_POST = 'ADD-POST'

let initialState = [
    { id: 0, text: "Текст поста 1", likesCount: 5, disLikesCount: 3 },
    { id: 1, text: "Текст поста 2", likesCount: 4, disLikesCount: 2 },
    { id: 2, text: "Текст поста 3", likesCount: 3, disLikesCount: 1 }
]

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newState = state.slice()
            let newPost = {
                id: Date.now(),
                text: action.payload,
                likesCount: 53,
                disLikesCount: 3
            }
            newState.splice(3, 0, newPost)
            return (
                newState
            )
        default:
            return state
    }
}

export const addPostActionCreator = (text) => { return { type: ADD_POST, payload: text } }

export default postsReducer