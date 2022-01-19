import { store } from "../Models/CurrentSearchModel";

const ListsBox = () => {

    let ListsBoxHTML = (
        <div id="ListsBox" className="flex flex-col items-center shadow-lg">
            <div className="w-full text-center py-3">Lists </div>
            <button className="py-1 w-full">Synonyms</button>
            <button className="py-1 w-full">Antonyms</button>
            <button className="py-1 w-full">Definitions</button>
            <button className="py-1 w-full">Examples</button>
        </div>
    )
    
    // return ListsBoxHTML
    return (store.currentSearch ? ListsBoxHTML : <></>)
}

export { ListsBox };