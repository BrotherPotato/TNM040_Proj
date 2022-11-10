import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Salar from '../components/Salar.json'

function getRoomData(roomCode){
    const roomData = Salar.filter(s => s.RoomCode === roomCode)[0];
    return roomData;
}


const SelectedRoom = () => {
    const roomCode = useParams().RoomCode;
    const roomData = getRoomData(roomCode);
    //console.log(roomData.RoomName != '');    
    const navigate = useNavigate();

    /*
    <Link to='/'>
        <h3>Link to home page </h3>
    </Link>
    */
    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF'}}>Selected Room</h1>
                <button style={{marginLeft:'10em'}} onClick={() => navigate(-1)}>(placeholder kryss)</button>
            </div>
            <div className='selectedRoom'>
                <h2 style={{display:'inline'}}>{roomData.RoomCode} {(roomData.RoomName !== '') && roomData.RoomName} </h2>
                <h3 style={{display:'inline'}}>{roomData.Purpose}</h3>
                <p>{(roomData.House !== '') && roomData.House} {(roomData.Floor !== '') && 'våning: ' + roomData.Floor}</p>
                <p style={{display:'inline'}}>{(roomData.Bokningsbar === 'y') && roomData.RoomCode + ' är bokningsbar'}</p>
                <p style={{display:'inline'}}>{(roomData.Bokningsbar === 'n') && roomData.RoomCode + ' är inte bokningsbar'}</p>
            </div>
        </div>
    )
}



export default SelectedRoom