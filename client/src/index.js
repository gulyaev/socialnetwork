import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import store from './redux/redux-store'

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = (state) => {
  root.render(
    <App state={state} store={store} dispatch={store.dispatch.bind(store)} />
  );
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});

