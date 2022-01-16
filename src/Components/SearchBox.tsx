import React, { useState, } from 'react';
import searchSynonyms from '../api/searchSynonyms';
import { store } from '../Models/CurrentSearchModel';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBox() {
    let [inputText, setInputText] = useState('');
    let styleBeforeSearch = 'flex flex-row w-6/12 h-12 shadow-xl'
    let styleAfterSearch = styleBeforeSearch + ' searchFormAnimation'
    let [style, setStyle] = useState(styleBeforeSearch)

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!store.currentSearch) {
            setTimeout(() => {searchSynonyms(inputText)}, 2000);
        } else {
            searchSynonyms(inputText);
        }  
        document.title = `Search: ${inputText}`
        document.getElementById('topContainerMain')?.classList.add("topContainerMainAnimation")
        setStyle(styleAfterSearch)
        // event.currentTarget.reset();
    }
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputText = event.target.value;
        setInputText(inputText)
      }
    return (
            <form className={style} onSubmit={onSubmitHandler} id="searchForm">
                <label
                    className="bg-white w-full flex justify-end"
                    htmlFor="search">
                    <input 
                        className=' w-full outline-none pl-2'
                        placeholder='Search'
                        id="searchInput"
                        type="text"
                        onChange={handleInputChange}
                    ></input>
                <button type="submit" style={{backgroundColor: "#242931"}}>
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        className='mx-2'
                        style={{color: "#58dcff"}} 
                        />
                </button>
                </label>
            </form>
        )
    }

export default observer(SearchBox);