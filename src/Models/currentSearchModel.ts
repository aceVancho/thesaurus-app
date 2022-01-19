import { types, } from 'mobx-state-tree';
import { ResultsModel } from './ResultsModel';
import { PartsOfSpeechModel } from './PartsOfSpeechModel';

const CurrentSearchModel = types
  .model('CurrentSearchModel', {
    id: types.maybe(types.string),
    apiEndpoint: types.maybe(types.string),
    searchWord: types.string,
    results: types.optional(types.array(ResultsModel), []),
    filterIsEnabled: types.optional(types.boolean, false),
    filterType: types.maybe(types.string),
    // filterType: types.union(types.maybe(types.string), types.maybe(PartsOfSpeechModel))
  })
  .views((self) => ({
    filterByPartOfSpeech(partOfSpeech: string) {
      let results:string[] = [];
      self.results?.forEach((resultsModel) => {
        if (resultsModel.partOfSpeech === partOfSpeech) resultsModel.synonyms?.forEach((word) => results.push(word))
      });  
      return results;
    },
    get filterBySynonyms() {
      const synonyms: string[] = []
      self.results.forEach((resultObj) => resultObj?.synonyms?.forEach((word) => synonyms.push(word)));
      return synonyms;
    },
    get filterByDefinitions() {
      const definitions: string[] = [];
      self.results.forEach((resultsObj) => {
        if (resultsObj.definition) {
          definitions.push(resultsObj?.definition)
        }
      })
      return definitions;
    },
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
    setFilterIsEnabled() {
      self.filterIsEnabled = !self.filterIsEnabled
    },
    setFilterType(filterType: string) {
      if (self.filterType !== filterType) {
        self.filterType = filterType
        if (!self.filterIsEnabled) this.setFilterIsEnabled()
      } else {
        self.filterType = undefined;
        this.setFilterIsEnabled()
      }
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

  export { CurrentSearchModel, store, };