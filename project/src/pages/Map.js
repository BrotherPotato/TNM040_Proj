import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function Map(){
    const House = useParams().House
    const Floor = useParams().Floor
    const navigate = useNavigate();

    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{House} Våning: {Floor}</h1>
                <img className='CloseImg' alt="Close Button" src="https://img.icons8.com/ios/50/FFFFFF/delete-sign-filled.png" onClick={() => navigate(-1)}/>
            </div>
        </div>
    )
}

export default Map;