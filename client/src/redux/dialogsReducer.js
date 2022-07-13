const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = [
    { id: 1, name: "Анна", message: "Привет" },
    { id: 2, name: "Александра", message: "Как дела ?" },
    { id: 3, name: "Вячеслав", message: "Познакомимся" }
]

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state
    }
}

export const addMessageActionCreator = (message) => { return { type: ADD_MESSAGE, payload: message } }

export default dialogsReducer