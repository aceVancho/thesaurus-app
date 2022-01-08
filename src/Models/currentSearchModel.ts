import { types, getRoot, getParent } from 'mobx-state-tree';

const currentSearchModel = types
  .model({
    id: types.maybe(types.string),
    apiEndpoint: types.maybe(types.string)
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
    afterCreate() {
      // getParent(self, 3)
      console.log('anything')
    }
  }));

  
  const rootStore = types
  .model({
    currentSearch: types.maybe(currentSearchModel)
  })
    .actions((self) => ({
      setCurrentSearch(currentSearchModel: any) {
        self.currentSearch = currentSearchModel;
      }
    }))

  const store = rootStore.create({})  

  export { currentSearchModel, store };