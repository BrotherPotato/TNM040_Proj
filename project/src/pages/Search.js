import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchComponent from '../components/SearchComponent.js'
import Salar from '../components/Salar.json'

function Search(){
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('')

    const matchSearch = sName => {
        const lowerCaseName = sName.RoomCode.toLowerCase()
        const lowerCaseSearch = searchString.toLowerCase()
        return lowerCaseName.indexOf(lowerCaseSearch) >= 0
    }

    const filteredSalar = Salar.filter(matchSearch)
    const inputSearchString = (e) => {
        setSearchString(e.target.value)
    }

    return(
        <div className='parent'>
            <div className='topBar'>
                <h2 style={{color: '#FFFFFF'}}>Sökresultat: </h2>
                <button style={{marginLeft:'10em'}} onClick={() => navigate(-1)}>(placeholder kryss)</button>
            </div>
            <div>
                <ul className='searchResults'>
                    {filteredSalar.map((s) => (
                        <SearchComponent data={s} key={s.RoomCode}/>
                    ))}
                </ul>
            </div>
            <div className='SearchBar'>
                <input
                    autoFocus
                    type='text'
                    label='Sök efter lokal: '
                    placeholder='Sök efter lokal...'
                    onInput={inputSearchString}
                />
            </div>
        </div>
    )
}

export default Search