import { CurrentSearchModel, store } from "../Models/CurrentSearchModel";
import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import { useState } from "react";

const FilterBox = () => {

    let [partsOfSpeech, setPartsOfSpeech] = useState<any>()

    onSnapshot(store, (snapShot) => {
        const partsOfSpeechSet = new Set(store.currentSearch?.results.map((result) => result.partOfSpeech)).keys()
        const partsOfSpeechArray = Array.from(partsOfSpeechSet)
        setPartsOfSpeech(partsOfSpeechArray)
        // console.log('view', store.currentSearch?.filterBySynonyms)
    })

    return (
        <div id="FilterBox" className="flex flex-col">
            {/* {partsOfSpeech?.map((part:any) => {
                return <p>{part}</p>
                })} */}
        </div>
    )
}

export { FilterBox };