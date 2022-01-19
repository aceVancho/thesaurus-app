import { store } from "../Models/CurrentSearchModel";
import { onSnapshot } from 'mobx-state-tree';
import React, { useState } from "react";

const FilterBox = () => {

    let [partsOfSpeech, setPartsOfSpeech] = useState<any>()

    onSnapshot(store, (snapShot) => {
        const partsOfSpeechSet = new Set(store.currentSearch?.results.map((result) => result.partOfSpeech)).keys()
        const partsOfSpeechArray = Array.from(partsOfSpeechSet)
        setPartsOfSpeech(partsOfSpeechArray)
    })

    const handleStyleChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const partOfSpeech = event.currentTarget.innerText;
        const lastFilterType = store.currentSearch?.filterType
        
        if (!event.currentTarget.classList.contains('pressed')) {
            event.currentTarget.classList.add('pressed')
            document.getElementById(`${lastFilterType}-filter`)?.classList.remove('pressed')
        } else {
            document.getElementById(`${partOfSpeech}-filter`)?.classList.remove('pressed')
        }
    }

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const partOfSpeech = event.currentTarget.innerText;
        handleStyleChange(event)
        return store.currentSearch?.setFilterType(partOfSpeech);
    }

    let FilterBoxHTML = (
        <div id="FilterBox" className="flex flex-col items-center shadow-lg">
            <div className="w-full text-center py-3">Parts of speech</div>
            {partsOfSpeech?.map((part:any, index:number) => <button id={`${part}-filter`} onClick={onClickHandler} className="py-1 w-full" key={index}>{part}</button>)}
        </div>
    )
    
    // return FilterBoxHTML
    return (store.currentSearch ? FilterBoxHTML : <></>)
}

export { FilterBox };