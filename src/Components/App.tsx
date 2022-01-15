import '../Styles/App.css'
import SearchWord from './SearchBox';
import {ResultsContainer} from './ResultsContainer';
import { store } from '../Models/currentSearchModel';
import { connectReduxDevtools } from 'mst-middlewares';
import makeInspectable from 'mobx-devtools-mst';
const remotedev = require('remotedev');


// Connect DEV TOOLS
const rootStore = makeInspectable(store);
connectReduxDevtools(remotedev, store);

function App() {
  
  return (
    <div id="main">
      <div 
        id="topContainerMain"
        className=""
      >
      </div>
      <div 
        id="bottomContainerMain"
        className=''
      >
        <SearchWord />  
        <ResultsContainer />  
      </div>
    </div>
  );
}

// export default App;
export { App, rootStore }
