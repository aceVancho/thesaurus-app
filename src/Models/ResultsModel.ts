import { types, } from 'mobx-state-tree';
import { store } from './CurrentSearchModel';

const ResultsModel = types
    .model('ResultsModel', {
        partOfSpeech: types.maybe(types.string),
        definition: types.maybe(types.string),
        synonyms: types.maybe(types.array(types.string)),
        examples: types.maybe(types.array(types.string)),
        derivation: types.maybe(types.array(types.string)),
        typeOf: types.maybe(types.array(types.string)),
        instanceOf: types.maybe(types.array(types.string)),
        inCategory: types.maybe(types.array(types.string)),
        hasInstances: types.maybe(types.array(types.string)),
        hasCategories: types.maybe(types.array(types.string)),
        hasTypes: types.maybe(types.array(types.string)),
        hasParts: types.maybe(types.array(types.string)),
    })
    .views((self) => ({
        // code
    }))
    .actions((self) => ({
        afterCreate() {
            store.currentSearch?.setResults(self);
        },
    }))

export { ResultsModel }