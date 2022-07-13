import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import store from './redux/store'

let rerenderEntireTree = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <App state={store.getState()} dispatch={store.dispatch.bind(store)} />
  );
}

rerenderEntireTree()

store.subscribe(rerenderEntireTree)
