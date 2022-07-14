import { combineReducers, legacy_createStore as createStore } from 'redux'
import postsReducer from './postsReducer'
import dialogsReducer from './dialogsReducer'

let rootReducer = combineReducers({
    postsData: postsReducer,
    dialogsData: dialogsReducer
})

const store = createStore(rootReducer)

export default store

