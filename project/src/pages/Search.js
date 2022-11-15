import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchComponent from '../components/SearchComponent.js'
import Salar from '../components/Salar.json'

function Search(){
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('')
    const [filterHouse, setFilterHouse] = useState('all')
    const [filterFloor, setFilterFloor] = useState('all')
    const [filterBookable, setFilterBookable] = useState('all')
    const [filterRestricted, setFilterRestricted] = useState('all')
    const [filterPurpose, setFilterPurpose] = useState('all')
    



    const matchSearch = sName => {
        const lowerCaseName = sName.RoomCode.toLowerCase()
        const lowerCaseSearch = searchString.toLowerCase()
        return lowerCaseName.indexOf(lowerCaseSearch) >= 0
    }
    Salar.sort((a, b) => {
        return a.RoomCode.localeCompare(b.RoomCode)
      })

    const filteredSalar = Salar.filter(matchSearch)
    const inputSearchString = (e) => {
        setSearchString(e.target.value)
    }

    function setFilterVisible(){
        if(document.getElementById("filterSettings").style.display === "none"){
            document.getElementById("filterSettings").style.display = "block"
        } else {
            document.getElementById("filterSettings").style.display = "none"
        }
    }
    function updateFilter(){
        //console.log(document.getElementById("selectHouse").value)

        // PHILIP FIXA DETTA
        //
        //
        //
        //


        setFilterHouse(document.getElementById("selectHouse").value)
        setFilterFloor(document.getElementById("selectFloor").value)
        setFilterBookable(document.getElementById("selectBookable").value)
        console.log(document.getElementById("selectRestricted").value)
        setFilterRestricted(document.getElementById("selectRestricted").value)
        //console.log(filterHouse)
    }
    function uppdateSort(){
        console.log("uppdateSort")

    }
    
    return(
        <div className='parent'>
            <div className='topBar'>
                <h2 style={{color: '#FFFFFF'}}>Sökresultat: </h2>
                <button style={{marginLeft:'10em'}} onClick={() => navigate(-1)}>(placeholder kryss)</button>
            </div>
            <div>
                <ul className='searchResults'>
                    {filteredSalar.filter(function (filteredSalar){
                        return (filterHouse === 'all' || filteredSalar.House === filterHouse)})
                        .map((s) => (
                        <SearchComponent data={s} key={s.RoomCode}/>
                    ))}
                </ul>
            </div>
            <div className='SearchBar' style={{marginTop: '1em'}}>
                <input
                    autoFocus
                    type='text'
                    label='Sök efter lokal: '
                    placeholder='Sök efter lokal...'
                    onInput={inputSearchString}
                />
                <img className='filterButton' alt="filterButton" src="https://img.icons8.com/ios/50/000000/filter-filled.png" onClick={() => setFilterVisible()}/>
            </div>
            <div id='filterSettings' style={{display: 'none'}}>
                <h3>Filterinställningar</h3>
                <div className='filterSettingsContent'>
                    <div className='filterSettingsRow'>
                        <p>Hus: </p>
                        <select id='selectHouse' onChange={updateFilter}>
                            <option value="all">Alla</option>
                            <option value="Kåkenhus">Kåkenhus</option>
                            <option value="Täppan">Täppan</option>
                            <option value="Spetsen">Spetsen</option>
                            <option value="Kopparhammaren">Kopparhammaren</option>
                        </select>
                    </div>
                    <div className='filterSettingsRow'> 
                    {// TODO: Fixa så att det är dynamiskt
                    }
                        <p>Våning: </p>
                        <select id='selectFloor' onChange={updateFilter}> 
                            <option value="all">Alla</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className='filterSettingsRow'>
                        <p>Bokningsbar: </p>
                        <input id='selectBookable' type='checkbox' onChange={updateFilter}/>
                    </div>
                    <div className='filterSettingsRow'>
                        <p>Visa begränsade områden: </p>
                        <input id='selectRestricted' type='checkbox' onChange={updateFilter}/>
                    </div>
                    <div className='filterSettingsRow'>
                        <p>Skärm: </p>
                        <input type='checkbox'/>
                    </div>
                    <div className='filterSettingsRow'>
                        <p>Telefon: </p>
                        <input type='checkbox'/>
                    </div>
                    

                </div>
            </div>


        </div>
    )
}

export default Search