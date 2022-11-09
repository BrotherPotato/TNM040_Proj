import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function Map(){
    const House = useParams().House
    const Floor = useParams().Floor
    const navigate = useNavigate();

    return(
        <div className='topBar'>
            <h1 style={{color: '#FFFFFF'}}>{House} våning: {Floor}</h1>
            <button style={{marginLeft:'10em'}} onClick={() => navigate(-1)}>(placeholder kryss)</button>
        </div>
    )
}

export default Map;