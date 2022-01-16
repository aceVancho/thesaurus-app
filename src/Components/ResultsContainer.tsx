import React, { useState, } from 'react';
import { store, } from '../Models/CurrentSearchModel';
import { onSnapshot } from 'mobx-state-tree';

export const ResultsContainer = () => {
    
    let [data, setData] = useState<any>()
    
    onSnapshot(store, (snapShot) => {
        setData(snapShot.currentSearch?.synonyms)
        // console.log('Data in ResultsContainer.tsx:', data)
    })

    let resultsContainerHTML = (
        <div id="resultsContainer" className='w-6/12 shadow-xl mt-6'>
            <ul className=''>
                {data?.noun?.map((word: string, index: number) => {
                    return (
                        <div key={index} className='flex items-center'>
                            <li key={index} className='list-disc list-inside pl-4'>
                                <span >{word.toLowerCase()}</span>
                            </li>
                        </div>
                    )
                    })}
                {data?.verb?.map((word: any, index: number) => {
                    return (
                        <div key={index} className='flex items-center'>
                            <li key={index} className='list-disc list-inside pl-4'>
                                <span >{word.toLowerCase()}</span>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )

    return (store.currentSearch ? resultsContainerHTML : <></>);
}