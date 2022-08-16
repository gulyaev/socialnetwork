import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import postsReducer from "./postsReducer";
import dialogsReducer from "./dialogsReducer";
import usersPageReducer from "./usersPageReducer";
import usersSidebarReducer from "./usersSidebarReducer";
import categoriesSidebarReducer from "./categoriesSidebarReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import fileReducer from "./fileReducer";

let rootReducer = combineReducers({
  postsData: postsReducer,
  dialogsData: dialogsReducer,
  usersSidebarData: usersSidebarReducer,
  categoriesSidebarData: categoriesSidebarReducer,
  usersData: usersPageReducer,
  auth: authReducer,
  app: appReducer,
  files: fileReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

window.store = store;

export default store;
