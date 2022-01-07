import { types } from 'mobx-state-tree';

const rootStore = types
  .model({
    id: types.number,
  })
  .views((self) => ({
    // code here
  }))
  .actions((self) => ({
    // code here
  }));

  export default rootStore;