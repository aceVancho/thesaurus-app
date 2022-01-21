import { store } from "../Models/CurrentSearchModel";
import { handleStyleChange } from "../utils/handleStyleChange";

const ListsBox = () => {

    const definitionsClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleStyleChange(event)
        store.currentSearch?.setFilterType('definitions')
        console.log(store.currentSearch?.filterByDefinitions)
    }

    let ListsBoxHTML = (
        <div id="ListsBox" className="flex flex-col items-center shadow-lg">
            <div className="w-full text-center py-3">Lists </div>
            <button className="py-2 w-full">Synonyms</button>
            <button className="py-2 w-full">Antonyms</button>
            <button className="py-2 w-full" id="definitions-filter" onClick={definitionsClickHandler}>Definitions</button>
            <button className="py-2 w-full">Examples</button>
        </div>
    )
    
    // return ListsBoxHTML
    return (store.currentSearch ? ListsBoxHTML : <></>)
}

export { ListsBox };