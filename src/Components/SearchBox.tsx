import React, { useState, } from 'react';
import searchSynonyms from '../api/searchSynonyms';
import { v4 as uuidv4 } from 'uuid';
import {CurrentSearchModel, SynonymsModel } from '../Models/currentSearchModel'
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
            <form className='flex flex-row w-10/12 border-black border-2 rounded' onSubmit={onSubmitHandler}>
                <label
                className="bg-white w-full flex justify-end" 
                htmlFor="search">
                    <input 
                        className='rounded-sm w-full'
                        placeholder='  Search'
                        id="search"
                        type="text"
                        onChange={handleInputChange}
                        ></input>
                <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </label>
            </form>
        )
    }

export default observer(SearchBox);