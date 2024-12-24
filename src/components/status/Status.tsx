import { useAppSelector } from '../../store/hook'; 

const Status = () => {
    const {loading, error} = useAppSelector(state=> state.cards);
    return (
        <>
            <div>{loading && <h2 style={{textAlign: 'center'}}>Loading</h2>}</div>
            <div>{error && <h2 style={{textAlign: 'center'}}>An error occured: {error}</h2>}</div>
        </>
    )
}

export { Status } 
