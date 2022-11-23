import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchComponent from '../components/SearchComponent.js'
import Salar from '../components/Salar.json'

function Search(){
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('')
    const [filterHouse, setFilterHouse] = useState('all')
    const [filterFloor, setFilterFloor] = useState('all')
    const [filterBookable, setFilterBookable] = useState('')
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
    function updateFilter(e){
        //console.log(document.getElementById("selectHouse").value)
        setFilterHouse(document.getElementById("selectHouse").value) // Klar
        setFilterFloor(document.getElementById("selectFloor").value) // Klar
        setFilterPurpose(document.getElementById("selectPurpose").value)// Typ klart behövs dock ett alternativ för att filtrera efter 'övriga' t.ex salar med unika funktioner
        setFilterBookable(e.target.checked) //Klar
        //setFilterRestricted(document.getElementById("selectRestricted").value)
    }
    function filteredResults(){
       return  filteredSalar.filter(function (filteredSalar){
            // Filter by house, if filterHouse is set to 'all' every room in the capus will be rendered.
            // If filterHouse is set to a specific house only the rooms in that house will be rendered.
            return (filterHouse === 'all' || filteredSalar.House === filterHouse)}) 
            // Filter by Floor, if filterFloor is set to 'all' every room on every floor will be rendered.
            // If filterFloor is set to a specific floor only the rooms on that floor will be rendered.
            .filter(function (filteredSalar){
            return(filterFloor === 'all' || filteredSalar.Floor == parseInt(filterFloor, 10))})
           // Filter by Purpose, if filterPurpose is set to 'all' every room despite purpose will be rendered.
           // If filterPurpose is set to one of the specific choices only rooms with that purpose will be rendered.
           // If filterPurpose is set to 'Other' only rooms which does not corralate with the specified options will be rendered.
           // These rooms are rooms which have very specifik purposes.
            .filter(function(filteredSalar){ 
            return(filterPurpose === 'all' || filteredSalar.Purpose === filterPurpose ||
             (filterPurpose==='Other' && !( filteredSalar.Purpose == 'Föreläsningssal' || filteredSalar.Purpose == 'Lärosal' 
             || filteredSalar.Purpose == 'Grupprum' || filteredSalar.Purpose == 'Datorsal')) )})
           // Filter if bookable, if the slider is checked only rooms which are bookable to students will be rendered.
            .filter(function (filteredSalar){ 
            if(filteredSalar.Bokningsbar === 'y' && filterBookable){return true}
            else if(!filterBookable){return true}})

    }
    
    return(
        <div className='parent'>
            <div className='topBar'>
                <h2 style={{color: '#FFFFFF', display: 'inline-block'}}>Sökresultat: </h2>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div>
                <ul className='searchResults'>
                    {
                       filteredResults() .map((s) => (
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
                <img className='filterButton' alt="filterButton" src={require('../images/TempFilter.png')} onClick={() => setFilterVisible()}/>
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
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className='filterSettingsRow'>
                        <p>Användning: </p>
                        <select id='selectPurpose' onChange={updateFilter}> 
                            <option value="all">Alla</option>
                            <option value="Föreläsningssal">Föreläsningssal</option>
                            <option value="Lärosal">Lärosal</option>
                            <option value="Grupprum">Grupprum</option>
                            <option value="Datorsal">Datorsal</option>
                            <option value="Other">Övriga</option>
                        </select>
                    </div>
                    <div className='filterSettingsRow'>
                        <p>Bokningsbar: </p>
                        <label className="switch">
                            <input id='selectBookable' type='checkbox' onChange={updateFilter}/>
                        <span className="slider round"></span>
                        </label>
                    </div>
                    {/*
                    <div className='filterSettingsRow'>
                        <p>Visa begränsade områden: </p>
                        <input id='selectRestricted' type='checkbox' onChange={updateFilter}/>
                    </div>
                    */}
                    <div className='filterSettingsRow'>
                        <p>Skärm: </p>
                        <label className="switch">
                            <input type='checkbox'/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Search