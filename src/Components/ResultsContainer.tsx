import React, { useState, } from 'react';
import { store, } from '../Models/currentSearchModel';
import { onSnapshot, onAction, onPatch } from 'mobx-state-tree';

export const ResultsContainer = () => {
    
    let [data, setData] = useState<any>()
    
    onSnapshot(store, (snapShot) => {
        setData(snapShot.currentSearch?.synonyms)
        console.log('Data in ResultsContainer.tsx:', data)
    })
    // if (store.currentSearch) {
    //     onAction(store.currentSearch, (call) => {
    //         console.log('onAction', call)
    //     })
    // }

    onPatch(store, (call) => {
        console.log('onPatch', call)
    })

    return (
        <ul>
            {data?.noun?.map((word: any, index: number) => <li key={index}>{word}</li>)}
            {data?.verb?.map((word: any, index: number) => <li key={index}>{word}</li>)}
        </ul>
    )
}