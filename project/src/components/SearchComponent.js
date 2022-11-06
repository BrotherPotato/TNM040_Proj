import React from 'react'
import { Link } from 'react-router-dom'

const SearchComponent = ({data}) =>{
    return(
        <Link className='resultLink' to={'/Search/'+ data.RoomCode}>
            <li className='singleSearchResult'>
                <h3>{data.RoomCode} {data.RoomName} </h3>
                <p>{data.House} våning: {data.Floor}</p>
            </li>
        </Link>
    )
}

export default SearchComponent
