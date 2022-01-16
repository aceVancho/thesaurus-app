import { types, } from 'mobx-state-tree';
import { ResultsModel } from './ResultsModel';


const SynonymsModel = types
  .model('SynonymsModel', {
    noun: types.maybe(types.array(types.string)),
    verb: types.maybe(types.array(types.string)),
    adverb: types.maybe(types.array(types.string)),
    adjective: types.maybe(types.array(types.string)),
  })

const CurrentSearchModel = types
  .model('CurrentSearchModel', {
    id: types.maybe(types.string),
    apiEndpoint: types.maybe(types.string),
    searchWord: types.string,
    synonyms: types.maybe(SynonymsModel),
    results: types.optional(types.array(ResultsModel), [])
  })
  .views((self) => ({
    filterByPartOfSpeech(partOfSpeech: string) {
      return self.results?.filter((resultsModel) => resultsModel.partOfSpeech === partOfSpeech);  
    }
  }))
  .actions((self) => ({
    setId(id: string) {
        self.id = id;
    },
    setApiEndpoint(endpoint: string) {
        self.apiEndpoint = endpoint;
    },
    setResults(results: any) {
      self.results?.push(results)
    },
    afterCreate() {
      store.setCurrentSearch(self)
    }
  }));

const rootStore = types
  .model('rootStore', {
    currentSearch: types.maybe(CurrentSearchModel,)
  })
  .actions((self) => ({
    setCurrentSearch(currentSearchModel: any) {
      self.currentSearch = currentSearchModel;
    }
  }))

  const store = rootStore.create({})

  export { CurrentSearchModel, store, SynonymsModel };