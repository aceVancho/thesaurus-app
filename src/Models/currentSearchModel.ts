import { types, } from 'mobx-state-tree';

// type partsOfSpeech = {
//   noun?: { syn: string[] }
//   verb?: { syn: string[] }
//   adverb?: { syn: string[] }
//   adjective?: { syn: string[] }
// }

const SynonymsModel = types
  .model({
    noun: types.maybe(types.array(types.string)),
    verb: types.maybe(types.array(types.string)),
    adverb: types.maybe(types.array(types.string)),
    adjective: types.maybe(types.array(types.string)),
  })
  // .actions(self => ({
  //   afterAttach() {
  //     store?.currentSearch?.setSynonyms(self)
  //   }
  // }))

const CurrentSearchModel = types
  .model({
    id: types.maybe(types.string),
    apiEndpoint: types.maybe(types.string),
    searchWord: types.string,
    synonyms: types.maybe(SynonymsModel)
  })
  .views((self) => ({
    // code here
  }))
  .actions((self) => ({
    setId(id: string) {
        self.id = id;
    },
    setApiEndpoint(endpoint: string) {
        self.apiEndpoint = endpoint;
    },
    // setSynonyms(synonymsModel: any) {
    //   self.synonyms = synonymsModel;
    // },
    afterCreate() {
      store.setCurrentSearch(self)
    }
  }));


  
  const rootStore = types
  .model({
    currentSearch: types.maybe(CurrentSearchModel,)
  })
    .actions((self) => ({
      setCurrentSearch(currentSearchModel: any) {
        self.currentSearch = currentSearchModel;
      }
    }))

  const store = rootStore.create({})  

  export { CurrentSearchModel, store, SynonymsModel };