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
                <h2 style={{color: '#FFFFFF'}}>Selected Room</h2>
                <button style={{marginLeft:'10em'}} onClick={() => navigate(-1)}>(placeholder kryss)</button>
            </div>
            <div className='selectedRoom'>
                <h1>{roomData.RoomCode} {(roomData.RoomName != '') && roomData.RoomName} </h1>
                <p>{(roomData.House != '') && roomData.House} {(roomData.Floor != '') && 'våning ' + roomData.Floor}</p>
            </div>

        </div>
    )
}



export default SelectedRoom