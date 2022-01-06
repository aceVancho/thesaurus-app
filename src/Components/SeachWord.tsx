import React, { useState } from 'react';

function SearchWord() {
    const [searchWord, setSearchWord] = useState('');
    const [value, setValue] = useState('');

    // TODO: fix types
    const onSubmitHandler = (event: any) => {
        console.log('Submitted')
        event.preventDefault();
        // do stuff
        event.currentTarget.reset();
    }
    
    // TODO: fix types
    const handleInputChange = (event: any) => {
        const myValue = event.value;
        setValue(myValue)
      }

    return (
            <div>
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
            </div>
        )
    }

export default SearchWord;