import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import postsReducer from './postsReducer'
import dialogsReducer from './dialogsReducer'
import usersReducer from './usersReducer';

let rootReducer = combineReducers({
    postsData: postsReducer,
    dialogsData: dialogsReducer,
    usersData: usersReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

window.store = store;

export default store
