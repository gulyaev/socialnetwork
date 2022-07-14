const ADD_POST = 'ADD-POST'

const postsReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            return (
                state.push({
                    id: Date.now(),
                    text: action.payload,
                    likesCount: 53,
                    disLikesCount: 3
                })
            )

        default:
            return state
    }
}

export const addPostActionCreator = (text) => { return { type: ADD_POST, payload: text } }

export default postsReducer