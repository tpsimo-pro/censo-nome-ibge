import {PacmanLoader} from 'react-spinners'

const LoadingComponent = () => {
    return(
        <>
        <h2>FETCHING DATA</h2>
        <PacmanLoader color='#36d7b7' size={50}/>
        </>
    )
}

export default LoadingComponent