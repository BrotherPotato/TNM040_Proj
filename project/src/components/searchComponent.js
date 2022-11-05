import React from 'react'

const SearchComponent = ({data}) =>{
    return(
        <li className='singleSearchResult'>
            <h3>{data.RoomCode} {data.RoomName} </h3>
            <p>{data.House} våning: {data.Floor}</p>
        </li>
    )
}

export default SearchComponent