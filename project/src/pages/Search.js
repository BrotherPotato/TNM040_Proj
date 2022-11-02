import { useNavigate } from 'react-router-dom'
import searchComponent from '../components/searchComponent'

function Search(){
    const navigate = useNavigate();

    return(
        <div className='parent'>
            <div className='TopBar'>
                <p>Sökresultat: </p>
                <button onClick={() => navigate(-1)}>(placeholder kryss)</button>
            </div>
            <div className='searchResults'>
                <table>
                    {/*rendrera sökresultaten enligt prototyp*/}
                </table>
            </div>
            <div className='SearchBar'>
                <input
                    type='text'
                    label='Sök efter lokal: '
                    placeholder='Sök efter lokal...'
                />
            </div>
        </div>
    )
}

export default Search