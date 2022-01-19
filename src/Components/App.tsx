import '../Styles/App.css'
import SearchWord from './SearchBox';
import { ResultsContainer } from './ResultsContainer';
import { LeftContainer } from './LeftContainer';
import { store } from '../Models/CurrentSearchModel';
import { connectReduxDevtools } from 'mst-middlewares';
import makeInspectable from 'mobx-devtools-mst';
import { FilterBox } from './FilterBox';
import { ListsBox } from './ListsBox';
const remotedev = require('remotedev');


// Connect DEV TOOLS
const rootStore = makeInspectable(store);
connectReduxDevtools(remotedev, store);

function App() {
  
  return (
    <div id="main">
      <div id="topContainerMain">
      </div>
      <div id="bottomContainerMain">
        <SearchWord />  
        <ResultsContainer />
        <LeftContainer />
        {/* <ListsBox />
        <FilterBox /> */}
      </div>
    </div>
  );
}

// export default App;
export { App, rootStore }
