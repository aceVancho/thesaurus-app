import { ListsBox } from "./ListsBox"
import { FilterBox } from "./FilterBox"
import { store } from "../Models/CurrentSearchModel"
import { useEffect, useRef, useState } from "react"
import { onSnapshot } from 'mobx-state-tree';


const LeftContainer = () => {
    let [storeExists, setStoreExists] = useState(false)
    onSnapshot(store, (snapShot) => {
        setStoreExists(true)
    })

    let LeftContainerHTML = (
        <div className="flex flex-col w-2/12 ml-12 mt-6">
            <ListsBox />
            <br></br>
            <FilterBox />
        </div>
    )
    console.log(storeExists)
    return (storeExists ? LeftContainerHTML : <></>)
    // return LeftContainerHTML;
}

export { LeftContainer }