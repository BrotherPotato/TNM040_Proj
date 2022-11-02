import React from 'react'

const SearchComponent = ({data}) =>{
    return(
        <li className='singleSearchResult'>
            <p>{data.RoomCode} {data.RoomName} Våning: {data.Floor}</p>
        </li>
    )
}

export default SearchComponent