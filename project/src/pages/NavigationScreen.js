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

    const inputString = (e) => {
        setCurrString(e.target.value)
    }

    function invertChoice(){
        let curr = document.getElementById('dest').placeholder
        document.getElementById('dest').placeholder = CurrString
        document.getElementById('curr').value = curr
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

                    <p style={{fontSize: '1.1em', marginLeft: '12vw', fontWeight: 700}}>Nuvarande position:</p>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '15px', marginTop: '10px'}}>
                        <img style={{width: '8vw', height: 'auto', alignSelf:'center', filter:'invert(1)'}} alt='Location icon' src={require('../images/TempCenterMap.png')}/>
                        <input id='curr' type='text' placeholder='Skriv in närmaste lokal...' onInput={inputString}
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
                        <button className='selectedOptions' onClick={()=>invertChoice()}>
                            <img style={{width: '5vw', height: 'auto', marginRight: '0.5em'}} src={require('../images/TempLocation.png')}></img>
                            Invertera valen
                        </button>
                        <Link className='resultLink' to={'/NavigationScreen/'+ RoomCode}>
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


export default NavigationScreen;