import React, { useState } from 'react';
import searchSynonyms from '../api/searchSynonyms';

function SearchBox() {
    let [inputText, setInputText] = useState('');

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('Submitted')
        event.preventDefault();
        searchSynonyms(inputText);
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