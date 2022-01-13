import { onSnapshot } from 'mobx-state-tree';
import { useState } from 'react';
import '../Styles/App.css'
import SearchWord from './SearchBox';
import {ResultsContainer} from './ResultsContainer';
import { store } from '../Models/currentSearchModel';
import { connectReduxDevtools } from 'mst-middlewares';
import makeInspectable from 'mobx-devtools-mst';
const remotedev = require('remotedev');
const ReactCSSTransitionGroup = require('react-transition-group');


// Connect DEV TOOLS
const rootStore = makeInspectable(store);
connectReduxDevtools(remotedev, store);
const appStyle = {backgroundColor: "#49556a"}

function App() {
  
  return (
    <div id="main">
      <SearchWord />
      <ResultsContainer />
    </div>
  );
}

// export default App;
export { App, rootStore }
