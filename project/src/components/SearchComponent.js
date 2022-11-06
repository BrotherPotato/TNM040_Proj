import React from 'react'
import { Link } from 'react-router-dom'

const SearchComponent = ({data}) =>{
    return(
        <div>
            <li className='singleSearchResult'>
                <Link className='resultLink' to={'/Search/'+ data.RoomCode}>
                    <h3>{data.RoomCode} {data.RoomName} </h3>
                </Link>

                <p>{data.House} våning: {data.Floor}</p>
            </li>
        </div>
        
    )
}

export default SearchComponent
