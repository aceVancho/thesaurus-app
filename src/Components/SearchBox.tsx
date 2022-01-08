import React, { useState, } from 'react';
import searchSynonyms from '../api/searchSynonyms';
import { v4 as uuidv4 } from 'uuid';
import {currentSearchModel, store} from '../Models/currentSearchModel'

function SearchBox() {
    let [inputText, setInputText] = useState('');

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        (async () => {
            const data: any = await searchSynonyms(inputText);
            console.log('data (in SearchBox.tsx):', data)
            const currentSearch = currentSearchModel.create({
                id: uuidv4(),
                apiEndpoint: data?.config?.url
            })
            store.setCurrentSearch(currentSearch)
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

export default SearchBox;