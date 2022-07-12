import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'

import state from './redux/state'
import { addPost } from './redux/state'
import { subscribe } from './redux/state'

let rerenderEntireTree = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <App state={state} addPost={addPost} />
  );
}

rerenderEntireTree()

subscribe(rerenderEntireTree)
