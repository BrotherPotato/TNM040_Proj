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
        if(document.getElementById("grayOverlay").style.display === "none"){
            document.getElementById("grayOverlay").style.display = "block"
            document.getElementById("filterSettings").style.display = "block"
        } else {
            document.getElementById("grayOverlay").style.display = "none"
            document.getElementById("filterSettings").style.display = "none"
        }
    }
    function updateFilter(e){
        //console.log(document.getElementById("selectHouse").value)
        setFilterHouse(document.getElementById("selectHouse").value) // Klar
        setFilterFloor(document.getElementById("selectFloor").value) // Klar
        setFilterPurpose(document.getElementById("selectPurpose").value)// Klar
        setFilterBookable(e.target.checked) //Klar
    }
    function filteredResults(){
       return  filteredSalar.filter(function (filteredSalar){
            // Filter by house, if filterHouse is set to 'all' every room in the capus will be rendered.
            // If filterHouse is set to a specific house only the rooms in that house will be rendered.
            return (filterHouse === 'all' || filteredSalar.House === filterHouse)}) 
            // Filter by Floor, if filterFloor is set to 'all' every room on every floor will be rendered.
            // If filterFloor is set to a specific floor only the rooms on that floor will be rendered.
            .filter(function (filteredSalar){
            return(filterFloor === 'all' || filteredSalar.Floor === parseInt(filterFloor, 10))})
           // Filter by Purpose, if filterPurpose is set to 'all' every room despite purpose will be rendered.
           // If filterPurpose is set to one of the specific choices only rooms with that purpose will be rendered.
           // If filterPurpose is set to 'Other' only rooms which does not corralate with the specified options will be rendered.
           // These rooms are rooms which have very specifik purposes.
            .filter(function(filteredSalar){ 
            return(filterPurpose === 'all' || filteredSalar.Purpose === filterPurpose ||
             (filterPurpose==='Other' && !( filteredSalar.Purpose === 'Föreläsningssal' || filteredSalar.Purpose === 'Lärosal' 
             || filteredSalar.Purpose === 'Grupprum' || filteredSalar.Purpose === 'Datorsal')) )})
           // Filter if bookable, if the slider is checked only rooms which are bookable to students will be rendered.
            .filter(function (filteredSalar){ 
            if(filteredSalar.Bokningsbar === 'y' && filterBookable){return true}
            else{return !filterBookable}})

    }
    

    return(
        <div className='parent'>
            <div className='topBar'>
                <h2 style={{color: '#FFFFFF', display: 'inline-block'}}>Sökresultat</h2>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div>
                <ul className='searchResults'>
                    {
                       filteredResults().map((s) => (
                        <SearchComponent data={s} key={s.RoomCode}/>
                    ))}
                </ul>
            </div>
            <div className='SearchBar' style={{display:'flex', paddingTop: '1em', borderTop: '3px solid #3DD2DC', justifyContent: 'space-evenly'}}>
                <input
                    autoFocus
                    id='homeInput'
                    type='text'
                    label='Sök efter lokal: '
                    placeholder='Sök efter lokal med salskod...'
                    onInput={inputSearchString}
                />
                <img className='filterButton' alt="filterButton" src={require('../images/TempFilter.png')} onClick={() => setFilterVisible()}/>
            </div>
            <div id="grayOverlay" style={{display: 'none'}} onClick={() => setFilterVisible()}></div>
            <div id='filterSettings' style={{display: 'none'}}>
                <h3>Filterinställningar</h3>
                <table className='filterSettingsContent' style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <td><p style={{display: 'inline', margin:'1em'}}>Hus: </p></td>
                            <td>
                                <select id='selectHouse' className='selectInput' onChange={updateFilter}>
                                    <option value="all">Alla</option>
                                    <option value="Kåkenhus">Kåkenhus</option>
                                    <option value="Täppan">Täppan</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><p style={{display: 'inline', margin:'1em'}}>Våning: </p></td>
                            <td>
                                <select id='selectFloor' className='selectInput' onChange={updateFilter}> 
                                    <option value="all">Alla</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                             <td><p style={{display: 'inline', margin:'1em'}}>Användning: </p></td>
                            <td>
                                <select id='selectPurpose' className='selectInput' onChange={updateFilter}> 
                                    <option value="all">Alla</option>
                                    <option value="Föreläsningssal">Föreläsningssal</option>
                                    <option value="Lärosal">Lärosal</option>
                                    <option value="Grupprum">Grupprum</option>
                                    <option value="Datorsal">Datorsal</option>
                                    <option value="Other">Övriga</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><p style={{display: 'inline', margin:'1em'}}>Bokningsbar: </p></td>
                            <td>
                                <label className="switch">
                                    <input id='selectBookable' type='checkbox' onChange={updateFilter}/>
                                <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Search