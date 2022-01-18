import { CurrentSearchModel, store } from "../Models/CurrentSearchModel";
import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import React, { useState } from "react";

const FilterBox = () => {

    let [partsOfSpeech, setPartsOfSpeech] = useState<any>()

    onSnapshot(store, (snapShot) => {
        const partsOfSpeechSet = new Set(store.currentSearch?.results.map((result) => result.partOfSpeech)).keys()
        const partsOfSpeechArray = Array.from(partsOfSpeechSet)
        setPartsOfSpeech(partsOfSpeechArray)
        // console.log('view', store.currentSearch?.filterByPartOfSpeech('verb'))
    })

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const partOfSpeech = event.currentTarget.innerText;
        store.currentSearch?.setFilterType(partOfSpeech);
        // TODO make resultsContainer display this data
        return console.log(store.currentSearch?.filterByPartOfSpeech(partOfSpeech))
    }

    let FilterBoxHTML = (
        <div id="FilterBox" className="flex flex-col absolute left-8 mt-6 w-2/12 items-center shadow-lg">
            <div className="w-full text-center py-3">Parts of speech</div>
            {partsOfSpeech?.map((part:any, index:number) => <button onClick={onClickHandler} className="py-1 w-full" key={index}>{part}</button>)}
        </div>
    )

    return (store.currentSearch ? FilterBoxHTML : <></>)
}

export { FilterBox };