import React, { useState, } from 'react';
import searchSynonyms from '../api/searchSynonyms';
import { v4 as uuidv4 } from 'uuid';
import {CurrentSearchModel, SynonymsModel } from '../Models/currentSearchModel'
import { observer } from 'mobx-react';

function SearchBox() {
    let [inputText, setInputText] = useState('');

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        (async () => {
            const response: any = await searchSynonyms(inputText);
            console.log('response (in SearchBox.tsx):', response)

            const synonymsModel = SynonymsModel.create({
                noun: response.data?.noun?.syn,
                verb: response.data?.verb?.syn,
                adverb: response.data?.adverb?.syn,
                adjective: response.data?.adjective?.syn,
            })
            CurrentSearchModel.create({
                id: uuidv4(),
                apiEndpoint: response?.config?.url,
                searchWord: inputText,
                synonyms: synonymsModel
            })
        })()
        document.title = `Search: ${inputText}`
        event.currentTarget.reset();
    }
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputText = event.target.value;
        setInputText(inputText)
      }

    return (
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="search">
                    <input 
                        id="search"
                        type="text"
                        onChange={handleInputChange}
                        ></input>
                </label>
                <button type="submit">Search</button>
            </form>
        )
    }

export default observer(SearchBox);