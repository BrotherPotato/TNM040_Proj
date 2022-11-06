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
    console.log(roomData.RoomName != '');    const navigate = useNavigate();
    return(
        <div>
            <Link to='/'>
                    <h3>Link to home page </h3>
            </Link>
            <h1>SelectedRoom: {roomData.RoomCode}</h1>
            {(roomData.RoomName != '') && <h2>{'RoomName: ' + roomData.RoomName}</h2>}

            {(roomData.Floor != '') && <h2>{'Floor: ' + roomData.Floor}</h2>}

            {(roomData.House != '') && <h2>{'House: ' + roomData.House}</h2>}

        </div>
    )
}

export default SelectedRoom