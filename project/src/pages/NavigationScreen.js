import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Salar from '../components/Salar.json'

function getRoomData(roomCode){
    const roomData = Salar.filter(s => s.RoomCode === roomCode)[0];
    return roomData;
}

function NavigationScreen(){
    const RoomCode = useParams().RoomCode;

    const roomData = getRoomData(RoomCode);
    const navigate = useNavigate();

    return(<div>
        <div className='topBar'>
            <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{roomData.RoomCode}</h1>
            <p style={{color: '#FFFFFF', display: 'inline-block'}}>{(roomData.House !== '') && roomData.House} {(roomData.Floor !== '') && 'våning: ' + roomData.Floor}</p>
            <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
        </div>

        <div>
            
        </div>

    </div>)
}


export default NavigationScreen;