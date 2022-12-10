import React from 'react'
import { Link } from 'react-router-dom'

const SearchComponent = ({data}) =>{
    return(
        <div>
            <li className='singleSearchResult' style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Link className='resultLink' to={'/Search/'+ data.RoomCode}>
                        <h3 style={{marginLeft:'10px'}}>{data.RoomCode} {data.RoomName} </h3>
                    </Link>
                    <p style={{marginLeft:'10px'}}>{data.House} våning {data.Floor}</p>
                </div>
                <img id='searchResultsArrow' style={{marginRight:'10px', width: '5vw', height: '5vw', alignSelf: 'center'}} alt="högerpil" src={require('../images/TempArrow.png')}/>
            </li>
        </div>
        
    )
}

export default SearchComponent
