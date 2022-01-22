import React, { Fragment, useEffect, useState, } from 'react';
import { store, } from '../Models/CurrentSearchModel';
import { onSnapshot } from 'mobx-state-tree';
import { DetailsExtension } from './DetailsExtension'

export const ResultsContainer = () => {
    interface IDetailsExtension {
        isOpen: boolean;
        word: string|undefined;
      }

    let [data, setData] = useState<any>()
    let [detailsExtension, setDetailsExtension] = useState<IDetailsExtension>({
        isOpen: false,
        word: undefined
    });

    useEffect(() => {
        detailsExtension.isOpen 
        ? store.currentSearch?.setFocusedResult(detailsExtension.word)
        : store.currentSearch?.setFocusedResult(undefined) 
    })

    const showDetailsExtensionHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const focusedElement = event.currentTarget.children[0].children[0] as HTMLElement
        // const resultId = event.currentTarget.dataset.resultId
        // const wordId = focusedElement.dataset.wordId
        // console.log("resultId:", resultId, "// wordId", wordId)
        const focusedWord = focusedElement.innerHTML
        setDetailsExtension(() => ({isOpen: !detailsExtension.isOpen, word: focusedWord}))
    }
    
    onSnapshot(store, (snapShot) => {
        if (store.currentSearch?.filterIsEnabled && store.currentSearch.filterType) {
            const filterType = store.currentSearch.filterType;
            setData(store.currentSearch.filterBy(filterType))
        } else {
            setData(store.currentSearch?.filterBySynonyms)
        }
    })

    let resultsContainerHTML = (
        <div id="resultsContainer" className='w-6/12 shadow-xl mt-6'>
            <ul className=''>
                {data?.map((word: string, index: number) => {
                    return (
                        <div onClick={showDetailsExtensionHandler} key={index}  data-result-id={index} className='flex flex-col items-left py-2 pl-7 pr-2'>
                            <li key={index} className='list-disc list-outside pl-1'>
                                <span data-word-id={index} data-word={word} >{word.toLowerCase()}</span>
                                {(detailsExtension.isOpen && word === detailsExtension.word) && DetailsExtension()}
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )

    return (store.currentSearch ? resultsContainerHTML : <></>);
}