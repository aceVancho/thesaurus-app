const HigherOrderComponent = (WrappedComponent: JSX.Element, data:any) => {
    return (
        <div id="HigherOrderComponent" className="">
            <button>noun</button>
            <button>verb</button>
        </div>
    )
}

const WrappedComponent = () => {
    return (
        <ul>
            <li></li>
        </ul>
    )
}

export { HigherOrderComponent }