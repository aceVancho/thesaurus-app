import React, { useState, } from 'react';
import { store, } from '../Models/CurrentSearchModel';
import { onSnapshot } from 'mobx-state-tree';

export const ResultsContainer = () => {
    
    let [data, setData] = useState<any>()
    
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
                        <div key={index} className='flex items-center py-2 pl-7 pr-2'>
                            <li key={index} className='list-disc list-outside pl-1'>
                                <span>{word.toLowerCase()}</span>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )

    return (store.currentSearch ? resultsContainerHTML : <></>);
}