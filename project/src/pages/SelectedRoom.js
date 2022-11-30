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
                <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{roomData.RoomCode} {(roomData.RoomName !== '') && roomData.RoomName}</h1>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div>
                <img style={{width: '85%', margin: '5%', border: '5px solid #3DD2DC', borderRadius: '2px'}} className='RoomImg' alt="Room Image" src={require('../images/TempPrinter.png')}/>
            </div>
            <div className='selectedRoom' style={{backgroundColor: '#FFFFFF'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img style={{width: '10vw'}} className='' alt='' src={require('../images/TempSlider.png')}/>
                    <p>Anpassa rutt</p>
                </div>
                <div>
                    <h2 style={{display:'inline'}}>{roomData.RoomCode} {(roomData.RoomName !== '') && roomData.RoomName} </h2>
                    <h3 style={{display:'inline'}}>{roomData.Purpose}</h3>
                    <p>{(roomData.House !== '') && roomData.House} {(roomData.Floor !== '') && 'våning: ' + roomData.Floor}</p>
                    <p style={{display:'inline'}}>{(roomData.Bokningsbar === 'y') && roomData.RoomCode + ' är bokningsbar'}</p>
                    <p style={{display:'inline'}}>{(roomData.Bokningsbar === 'n') && roomData.RoomCode + ' är inte bokningsbar'}</p>
                </div>
            </div>
        </div>
    )
}



export default SelectedRoom