import { store } from "../Models/CurrentSearchModel";

const DetailsExtension = () => {
    const focusedResult = store.currentSearch?.focusedResult
    let focusedResultObject;
    if (focusedResult) focusedResultObject = store.currentSearch?.getFocusedResult(focusedResult)
    console.log(focusedResultObject)

    
    // console.log(focusedResultObject)
    return (
        <div>
            <p>{focusedResult}</p>
        </div>
    )
}

export { DetailsExtension };