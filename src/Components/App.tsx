import '../Styles/App.css'
import SearchWord from './SearchBox';
import rootStore from '../Models/rootStore';

// Connect DEV TOOLS
import { connectReduxDevtools } from 'mst-middlewares';
import makeInspectable from 'mobx-devtools-mst';
const remotedev = require('remotedev');

const store = makeInspectable(rootStore.create({id: 1}));
connectReduxDevtools(remotedev, store);

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Thesaurus</h1>
      <SearchWord />
    </div>
  );
}

export default App;
