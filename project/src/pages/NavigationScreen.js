import React from 'react'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Salar from '../components/Salar.json'

function getRoomData(roomCode){
    const roomData = Salar.filter(s => s.RoomCode === roomCode)[0];
    return roomData;
}

function NavigationScreen(){
    const RoomCode = useParams().RoomCode;
    const [CurrString, setCurrString] = useState('')
    const [BoxState, setBoxState] = useState('Up');
    const[ArrowState, setArrowState] = useState('Up')
    const roomData = getRoomData(RoomCode);
    const navigate = useNavigate();

    const toggleBox = () => {
        //setBoxState(!BoxState)
        if(BoxState === "Up"){
            setBoxState("Down");
            setArrowState('Down')
        } else {
            setBoxState("Up");
            setArrowState('Up')
        }
    }

    return(<div>
        <div className='topBar'>
            <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{roomData.RoomCode}</h1>
            <p style={{color: '#FFFFFF', display: 'inline-block'}}>{(roomData.House !== '') && roomData.House} {(roomData.Floor !== '') && 'våning: ' + roomData.Floor}</p>
            <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
        </div>

        <div>
            {/*Karta*/}
        </div>
            <div id='selectedRoom' className={'selectedRoomTransition' + BoxState} style={{backgroundColor: '#FFFFFF', display: 'block'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <img style={{width: '10vw', height: '10vw', alignSelf: 'center'}} className='' alt='' src={require('../images/TempSlider.png')}/>
                    <p style={{marginLeft:"-4em"}}>Anpassa rutt</p>
                    <img style={{marginLeft: '40vw',marginTop: '0px', width: '5vw', height: '5vw', alignSelf: 'center'}} id='arrow' className={'arrowTransition' + ArrowState} alt='' src={require('../images/TempArrow.png')} onClick={() => toggleBox()}/>
                </div>

                <div style={{width: '100%', height: '1px', backgroundColor: 'black', margin: 'auto'}}></div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <p style={{fontSize: '1.1em', marginLeft: '12vw', fontWeight: 700}}>Startposition: {roomData.RoomCode}</p>
                        <p style={{fontSize: '1.1em', marginRight: '12vw', fontWeight: 700}}>Slutposition: {roomData.RoomCode}</p>
                    </div>
                 
                </div>
            </div>
    )
}


export default NavigationScreen;