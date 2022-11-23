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
    function uppdateSort(){
        console.log("uppdateSort")

    }
    
    return(
        <div className='parent'>
            <div className='topBar'>
                <h2 style={{color: '#FFFFFF', display: 'inline-block'}}>Sökresultat: </h2>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div>
                <ul className='searchResults'>
                    {filteredSalar.filter(function (filteredSalar){// Filter by house
                        return (filterHouse === 'all' || filteredSalar.House === filterHouse)}) 
                        .filter(function (filteredSalar){ // Filter by Floor
                        return(filterFloor === 'all' || filteredSalar.Floor == parseInt(filterFloor, 10))})
                        .filter(function(filteredSalar){ // Filter by Purpose
                        return(filterPurpose === 'all' || filteredSalar.Purpose === filterPurpose)})
                        .filter(function (filteredSalar){ // Filter if bookable
                        if(filteredSalar.Bokningsbar === 'y' && filterBookable){return true}
                        else if(!filterBookable){return true}})
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
                        </select>
                    </div>
                    <div className='filterSettingsRow'>
                        <p>Bokningsbar: </p>
                        <input id='selectBookable' type='checkbox' onChange={updateFilter}/>
                    </div>
                    {/*
                    <div className='filterSettingsRow'>
                        <p>Visa begränsade områden: </p>
                        <input id='selectRestricted' type='checkbox' onChange={updateFilter}/>
                    </div>
                    */}
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