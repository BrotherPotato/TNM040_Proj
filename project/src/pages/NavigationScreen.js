import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function NavigationScreen(){
    const RoomCode = useParams().RoomCode;

    return(<div>
        <h1>NavigationScreen</h1>
        <h2>{RoomCode}</h2>

    </div>)
}


export default NavigationScreen;