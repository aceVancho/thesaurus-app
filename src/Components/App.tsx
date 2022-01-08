import '../Styles/App.css'
import SearchWord from './SearchBox';
import ResultsContainer from './ResultsContainer';
import { currentSearchModel, store } from '../Models/currentSearchModel';
import { connectReduxDevtools } from 'mst-middlewares';
import makeInspectable from 'mobx-devtools-mst';
const remotedev = require('remotedev');

// Connect DEV TOOLS
const rootStore = makeInspectable(store);
connectReduxDevtools(remotedev, store);




function App() {
  return (
    <div className="App">
      <h1 className="font-bold underline">Thesaurus</h1>
      <SearchWord />
      <ResultsContainer />
    </div>
  );
}

// export default App;
export { App, rootStore }
