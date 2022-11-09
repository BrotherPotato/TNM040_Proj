import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

function Map(){
    const House = useParams().House
    const Floor = useParams().Floor

    return(
        <p>{House} {Floor}</p>
    )
}

export default Map;