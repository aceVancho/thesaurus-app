import { store } from "../Models/CurrentSearchModel";
import { handleStyleChange } from "../utils/handleStyleChange";

const ListsBox = () => {

    const definitionsClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleStyleChange(event)
        store.currentSearch?.setFilterType('definitions')
    }

    const antonymsClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleStyleChange(event)
        store.currentSearch?.setFilterType('antonyms')
    }

    const examplesClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleStyleChange(event)
        store.currentSearch?.setFilterType('examples')
    }

    let ListsBoxHTML = (
        <div id="ListsBox" className="flex flex-col items-center shadow-lg">
            <div className="w-full text-center py-3">Lists </div>
            <button className="py-2 w-full">Synonyms</button>
            <button className="py-2 w-full" id="antonyms-filter" onClick={antonymsClickHandler}>Antonyms</button>
            <button className="py-2 w-full" id="definitions-filter" onClick={definitionsClickHandler}>Definitions</button>
            <button className="py-2 w-full" id="examples-filter" onClick={examplesClickHandler}>Examples</button>
        </div>
    )
    
    // return ListsBoxHTML
    return (store.currentSearch ? ListsBoxHTML : <></>)
}

export { ListsBox };