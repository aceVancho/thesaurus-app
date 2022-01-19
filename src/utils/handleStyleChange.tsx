import { store } from "../Models/CurrentSearchModel";

const handleStyleChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentFilterType = event.currentTarget.innerText;
    const lastFilterType = store.currentSearch?.filterType
    
    if (!event.currentTarget.classList.contains('pressed')) {
        event.currentTarget.classList.add('pressed')
        document.getElementById(`${lastFilterType}-filter`)?.classList.remove('pressed')
    } else {
        document.getElementById(`${lastFilterType}-filter`)?.classList.remove('pressed')
    }
}

export { handleStyleChange }