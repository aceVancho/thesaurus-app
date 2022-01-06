import React from 'react';
import logo from '../Styles/logo.svg';
import '../Styles/App.css'
import SearchWord from './SeachWord';

// FOR DEV TOOLS
import { connectReduxDevtools } from 'mst-middlewares';
import { types, getSnapshot } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
const remotedev = require('remotedev');

const ToDoStore = types
  .model({
    id: types.number,
  })
  .views((self) => ({
    // code here
  }))
  .actions((self) => ({
    // code here
  }));

const store = makeInspectable(ToDoStore.create({id: 1}));
connectReduxDevtools(remotedev, store);

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <SearchWord />
    </div>
  );
}

export default App;
