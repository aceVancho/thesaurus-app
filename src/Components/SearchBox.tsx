import React, { useState, } from 'react';
import searchSynonyms from '../api/searchSynonyms';
import { v4 as uuidv4 } from 'uuid';
import {CurrentSearchModel, SynonymsModel } from '../Models/currentSearchModel'
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBox() {
    let [inputText, setInputText] = useState('');
    let styleBeforeSearch = 'flex flex-row w-10/12 h-12'
    let styleAfterSearch = styleBeforeSearch + ' searchFormAnimation'
    let [style, setStyle] = useState(styleBeforeSearch)

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
        setStyle(styleAfterSearch)
        event.currentTarget.reset();
    }
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputText = event.target.value;
        setInputText(inputText)
      }
    return (
            <form className={style} onSubmit={onSubmitHandler}>
                <label
                className="bg-white w-full flex justify-end rounded shadow-lg focus:border-none"
                style={{border: "2px solid #a69986"}} 
                htmlFor="search">
                    <input 
                        className=' w-full outline-none pl-2'
                        style={{backgroundColor: "#21272f", color: 'white'}}
                        // TODO: fix autocomplete color
                        placeholder='  Search'
                        id="search"
                        type="text"
                        onChange={handleInputChange}
                        ></input>
                <button type="submit" style={{backgroundColor: "#21272f"}}>
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        className='mx-2 text-blue-800' 
                        />
                </button>
                </label>
            </form>
        )
    }

export default observer(SearchBox);