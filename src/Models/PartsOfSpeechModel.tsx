import { types, } from 'mobx-state-tree';

const PartsOfSpeechModel = types
    .model('PartsOfSpeechModel', {
        selectedPartOfSpeech: types.maybe(types.string)
    })
    .actions((self) => ({
        setSelectedPartOfSpeech(partOfSpeech: string) {
            self.selectedPartOfSpeech = partOfSpeech
        }
    }))

export { PartsOfSpeechModel }