import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Salar from '../components/Salar.json'

function getRoomData(roomCode){
    const roomData = Salar.filter(s => s.RoomCode === roomCode)[0];
    return roomData;
}




const SelectedRoom = () => {
    const [BoxState, setBoxState] = useState('Up')
    const[ArrowState, setArrowState] = useState('Up')
    const roomCode = useParams().RoomCode;
    const roomData = getRoomData(roomCode);
    //console.log(roomData.RoomName != '');    
    const navigate = useNavigate();
    
    const toggleBox = () => {
        //setBoxState(!BoxState)
        if(BoxState === "Up"){
            setBoxState("Down")
            setArrowState('Down')
        } else {
            setBoxState("Up")
            setArrowState('Up')
        }
    }


    function invertChoice(){
        let curr = document.getElementById('dest').value
        let dest = document.getElementById('curr').value
        document.getElementById('dest').value = dest
        document.getElementById('curr').value = curr
    }

    function findRoom(roomCode){
        let result = Salar.filter(s => s.RoomCode === roomCode)
        if(result.length > 0){
            return true
        } else {
            return false
        }
    }

    function moveToRoute(){
        let curr = document.getElementById('curr').value.toUpperCase().trim();

        if(findRoom(curr)){
            navigate('../Search/' + curr)
        } else if(curr === ''){
            alert('Du måste ange en sal')
        } else {
            alert(curr + ' är en ogiltig salskod')
        }
    }

    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{roomData.RoomCode}</h1>
                <p style={{color: '#FFFFFF', display: 'inline-block'}}>{(roomData.House !== '') && roomData.House} {(roomData.Floor !== '') && 'våning: ' + roomData.Floor}</p>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div style={{display: 'flex', justifyContent:'center'}}>
                <img style={{width: '85%', height:"40vh", border: '5px solid #3DD2DC', borderRadius: '2px', marginTop: '-5%'}} id='RoomImg' alt="Room Image" src={require('../images/TempPrinter.png')}/>
            </div>

            <div id='selectedRoom' className={'selectedRoomTransition' + BoxState} style={{backgroundColor: '#FFFFFF', display: 'block'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <img style={{width: '10vw', height: '10vw', alignSelf: 'center'}} className='' alt='' src={require('../images/TempSlider.png')}/>
                    <p style={{marginLeft:"-4em"}}>Anpassa rutt</p>
                    <img style={{marginLeft: '40vw',marginTop: '0px', width: '5vw', height: '5vw', alignSelf: 'center'}} id='arrow' className={'arrowTransition' + ArrowState} alt='' src={require('../images/TempArrow.png')} onClick={() => toggleBox()}/>
                </div>

                <div style={{width: '100%', height: '1px', backgroundColor: 'black', margin: 'auto'}}></div>

                    <p style={{fontSize: '1.1em', marginLeft: '12vw', fontWeight: 700}}>Nuvarande position:</p>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '15px', marginTop: '10px'}}>
                        <img style={{width: '8vw', height: 'auto', alignSelf:'center', filter:'invert(1)'}} alt='Location icon' src={require('../images/TempCenterMap.png')}/>
                        <input id='curr' type='text' placeholder='Skriv in närmaste lokal...' 
                        style={{border: '1px solid black', borderRadius: '15px', width: '78vw', marginLeft: '1em', height: '5.5vh', padding: '10px'}}>
                        </input>
                    </div>
                    <p style={{fontSize: '1.1em', marginLeft: '12vw', fontWeight: 700}}>Destination:</p>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '15px',marginTop: '10px'}}>
                        <img style={{width: '8vw', height: 'auto', alignSelf:'center'}} alt='Center map icon' src={require('../images/TempLocation.png')}/>
                        <input id='dest' type='text' placeholder={roomData.RoomCode} disabled
                        style={{border: '1px solid black', borderRadius: '15px', width: '78vw', marginLeft: '1em', height: '5.5vh', padding: '10px'}}>
                        </input>
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '10px', marginTop: '20px'}}>
                        <button className='selectedOptions' onClick={() => moveToRoute()}>
                            <img style={{width: '5vw', height: 'auto', marginRight: '0.5em'}} src={require('../images/TempLocation.png')}></img>
                            Invertera valen
                        </button>
                        <Link className='resultLink' to={'/NavigationScreen/'+ roomCode}>
                            <button className='selectedOptions'>
                                <img style={{width: '5vw', height: 'auto', marginRight: '0.5em'}} src={require('../images/TempLocation.png')}></img>
                                Visa rutt
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}




export default SelectedRoom