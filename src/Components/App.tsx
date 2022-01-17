import '../Styles/App.css'
import SearchWord from './SearchBox';
import {ResultsContainer} from './ResultsContainer';
import { FilterBox } from './FilterBox';
import { store } from '../Models/CurrentSearchModel';
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
        <FilterBox />
      </div>
    </div>
  );
}

// export default App;
export { App, rootStore }
