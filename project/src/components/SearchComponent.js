import React from 'react'
import { Link } from 'react-router-dom'

const SearchComponent = ({data}) =>{
    return(
        <div style={{borderBottom: '1px solid #39bde3'}}>
            <Link className='resultLink' to={'/Search/'+ data.RoomCode}>
                <li className='singleSearchResult' style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <h3 style={{marginLeft:'10px'}}>{data.RoomCode} {data.RoomName} </h3>
                        <p style={{marginLeft:'10px'}}>{data.House} våning {data.Floor}</p>
                    </div>
                    <img id='searchResultsArrow'alt="högerpil" src={require('../images/TempArrow.png')}/>
                </li>
            </Link>
        </div>
        
    )
}

export default SearchComponent
