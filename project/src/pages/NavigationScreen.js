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
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '4px'}}>
                <img style={{width: '8vw', height: 'auto', alignSelf: 'center'}} className='' alt='' src={require('../images/TempLocation.png')}/>
                <p style={{fontSize: '1.1em', fontWeight: 700}}>Startposition: {roomData.RoomCode}</p>
                <p style={{fontSize: '1.1em', fontWeight: 700}}>Slutposition: {roomData.RoomCode}</p>
                <img style={{marginLeft: '20vw',marginTop: '0px', width: '5vw', height: '5vw', alignSelf: 'center'}} id='arrow' className={'arrowTransition' + ArrowState} alt='' src={require('../images/TempArrow.png')} onClick={() => toggleBox()}/>
            </div>

            <div style={{width: '100%', height: '1px', backgroundColor: 'black', margin: 'auto'}}></div>
            {/*Steg */}
            <div className='stepDiv'>
                <div className='stepDiv'>
                    <img style={{width: '8vw', height: 'auto', alignSelf: 'center'}} className='' alt='' src={require('../images/TempArrowUp.png')}/>
                    <p style={{fontSize: '1.1em', fontWeight: 700, marginLeft: '5vw'}}>Startposition: {roomData.RoomCode}</p>
                </div>
                
                <div className='arrowDiv'>
                    <img style={{width: '5vw', height: '5vw', alignSelf: 'center', transform: 'rotate(-180deg)'}} className='' alt='' src={require('../images/TempArrow.png')}/>
                </div>
            </div>
            <div style={{width: '90%', height: '1px', backgroundColor: 'grey', margin: 'auto'}}></div>
            <div className='stepDiv'>
                <div className='stepDiv'>
                    <img style={{width: '8vw', height: 'auto', alignSelf: 'center'}} className='' alt='' src={require('../images/TempArrowUp.png')}/>
                    <p style={{fontSize: '1.1em', fontWeight: 700, marginLeft: '5vw'}}>Startposition: {roomData.RoomCode}</p>
                </div>
                
                <div className='arrowDiv'>
                    <img style={{width: '5vw', height: '5vw', alignSelf: 'center', transform: 'rotate(-180deg)'}} className='' alt='' src={require('../images/TempArrow.png')}/>
                </div>
            </div>
            <div style={{width: '90%', height: '1px', backgroundColor: 'grey', margin: 'auto'}}></div>
            <div className='stepDiv'>
                <div className='stepDiv'>
                    <img style={{width: '8vw', height: 'auto', alignSelf: 'center'}} className='' alt='' src={require('../images/TempArrowUp.png')}/>
                    <p style={{fontSize: '1.1em', fontWeight: 700, marginLeft: '5vw'}}>Startposition: {roomData.RoomCode}</p>
                </div>
                
                <div className='arrowDiv'>
                    <img style={{width: '5vw', height: '5vw', alignSelf: 'center'}} className='' alt='' src={require('../images/TempArrow.png')}/>
                </div>
            </div>
        </div>
    </div>
    )
}


export default NavigationScreen;