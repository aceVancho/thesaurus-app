import { types } from 'mobx-state-tree';
import { ResultsModel } from './ResultsModel';

const CurrentSearchModel = types
  .model('CurrentSearchModel', {
    id: types.maybe(types.string),
    apiEndpoint: types.maybe(types.string),
    searchWord: types.string,
    results: types.optional(types.array(ResultsModel), []),
    filterIsEnabled: types.optional(types.boolean, false),
    filterType: types.maybe(types.string),
    focusedResult: types.maybe(types.string),
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
    get filterByAntonyms() {
      const antonyms: string[] = [];
      self.results.forEach((resultsObj) => {
        if (resultsObj.antonyms) {
          resultsObj.antonyms.forEach((antonym) => {
            if (!antonyms.includes(antonym)) antonyms.push(antonym)
          })
        }
      }) 
      return antonyms;
    },
    get filterByExamples() {
      const examples: string[] = [];
      self.results.forEach((resultsObj) => {
        if (resultsObj.examples) {
          resultsObj.examples.forEach((example) => {
            if (!examples.includes(example)) examples.push(example)
          })
        }
      }) 
      return examples;
    },
    filterBy(filterType: string) {
      switch(self?.filterType) {
        case "noun":
        case "verb":
        case "adjective":
        case "adverb":
        case "pronoun":
        case "preposition":
        case "conjunction":
        case "interjection":
          return this.filterByPartOfSpeech(filterType)

        case "definitions":
          return this.filterByDefinitions.length === 0 ? ['No definitions found'] : this.filterByDefinitions
        
        case "antonyms":
          return this.filterByAntonyms.length === 0 ? ['No antonyms found'] : this.filterByAntonyms
        
        case "examples":
          return this.filterByExamples.length === 0 ? ['No examples found'] : this.filterByExamples
      }
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
    setFocusedResult(word: string|undefined) {
      self.focusedResult = word;
    },
    getFocusedResult(focusedResult:string) {
      let result = self.results.find((resultObj) => resultObj.synonyms?.includes(focusedResult))
      return result
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