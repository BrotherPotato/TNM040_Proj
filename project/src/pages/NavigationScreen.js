import React from 'react'
import { useState } from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Salar from '../components/Salar.json'

function getRoomData(roomCode){
    const roomData = Salar.filter(s => s.RoomCode === roomCode)[0];
    return roomData;
}

function NavigationScreen(){
    const RoomCode = useParams().RoomCode;
    const [BoxState, setBoxState] = useState('Up')
    const[ArrowState, setArrowState] = useState('Up')
    const roomData = getRoomData(RoomCode);
    const navigate = useNavigate();
    const { state } = useLocation();
    //state.current
    console.log(state.current)

    let midString = ''
    let imgPath = require('../images/TempStairs.png')

    /* === SVG VIEW === */
    const buildingName = roomData.House.toLowerCase().replace('å', 'a').replace('ä', 'a').replace('hus', '');
    const floorNumber = parseInt(roomData.Floor);
    if(window.svgView.ready) {
        window.svgView.displayFloor(buildingName, floorNumber);
    }

    document.getElementById('svg-root').style.display = 'block';
    /* === SVG VIEW === */

    uppdateCurrentPathTextAndInfo()
    function uppdateCurrentPathTextAndInfo(){
        let currentRoomInfo = getRoomData(state.current)
        let destinationRoomInfo = getRoomData(roomData.RoomCode)

        let currentHouse = currentRoomInfo.House
        let destinationHouse = destinationRoomInfo.House

        let currentFloor = currentRoomInfo.Floor
        let destinationFloor = destinationRoomInfo.Floor

        //let midString = ''

        if(currentHouse != destinationHouse){
            console.log('Husen är olika ' + currentHouse + ' ' + destinationHouse)
            midString = 'Gå till ' + destinationHouse +  ' och gå sedan '
            imgPath = require('../images/TempWalk.png')
        } else {
            console.log('Husen är samma')
            midString = 'Gå  '
        }
        midString = midString + '' 
        if(currentFloor == destinationFloor){
            console.log('Våningarna är samma')
            midString = midString + 'till ' + destinationRoomInfo.RoomCode
        } else if(currentFloor > destinationFloor){
            console.log('Våningarna är olika')
            midString = midString + 'ned ' + (currentFloor - destinationFloor) + ' våningar och gå sedan till ' + destinationRoomInfo.RoomCode
            imgPath = require('../images/TempTrappaNer.png')
        } else if(currentFloor < destinationFloor){
            console.log('Våningarna är olika')
            midString = midString + 'upp ' + (destinationFloor - currentFloor) + ' våningar och gå sedan till ' + destinationRoomInfo.RoomCode
            imgPath = require('../images/TempTrappaUpp.png')
        }
    
        if(currentHouse != destinationHouse){
            imgPath = require('../images/TempHouse.jpg')
        }
        
    }

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

        <div className='mapContainer' style={{position: 'absolute', left: '0px'}}>


        </div>
        <div id='selectedRoom' className={'selectedRoomTransition' + BoxState} style={{backgroundColor: '#FFFFFF', display: 'block', height: '40vh'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '4px'}}>
                <img style={{width: '8vw', height: 'auto', alignSelf: 'center'}} className='' alt='' src={imgPath}/>
                <p style={{fontSize: '1.1em', fontWeight: 700}}>Startposition: {state.current}</p>
                <p style={{fontSize: '1.1em', fontWeight: 700}}>Slutposition: {roomData.RoomCode}</p>
                
                <img style={{marginLeft: '10vw',marginTop: '0px', width: '5vw', height: '5vw', alignSelf: 'center'}} id='arrow' className={'arrowTransition' + ArrowState} alt='' src={require('../images/TempArrow.png')} onClick={() => toggleBox()}/>
                
            </div>
            
            <div style={{width: '100%', height: '1px', backgroundColor: 'black', margin: 'auto'}}></div>
            
            {/*Steg */}
            
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '30vh'}}>
                <div className='stepDiv' style={{filter: 'opacity(0.8)', marginRight: '2px', marginTop: '15px'}}>
                    <div className='stepDiv'>
                        <img style={{width: '8vw', height: 'auto', alignSelf: 'center', filter:'invert(1)'}} className='' alt='' src={require('../images/TempCenterMap.png')}/>
                        <p style={{fontSize: '1.1em', fontWeight: 700, marginLeft: '5vw'}}>Startposition: {state.current}</p>
                    </div>
                    
                    <div className='arrowDiv' >
                        <img style={{width: '5vw', alignSelf: 'center', transform: 'rotate(-180deg)'}} className='' alt='' src={require('../images/TempArrow.png')}/>
                    </div>
                </div>
                <div style={{width: '90%', height: '1px', backgroundColor: 'grey', margin: 'auto'}}></div>
                <div className='stepDiv'>
                    <div className='stepDiv'>
                        <img style={{width: '8vw', height: 'auto', alignSelf: 'center', filter: 'grayscale(0)'}} className='' alt='' src={imgPath}/>
                        <p id='midText' style={{fontSize: '1.1em', fontWeight: 700, marginLeft: '5vw'}}>{midString}</p>
                    </div>
                    
                    <div className='arrowDiv' style={{backgroundColor: '#00B3E7', width: '8vw', height: '8vw'}}>
                        <img style={{width: '12vw', alignSelf: 'center', marginTop: '4px'}} className='' alt='' src={require('../images/TempCheck.png')}/>
                    </div>
                </div>
                <div style={{width: '90%', height: '1px', backgroundColor: 'grey', margin: 'auto'}}></div>
                <div className='stepDiv' style={{filter: 'opacity(0.8)', marginRight: '2px'}}>
                    <div className='stepDiv'>
                        <img style={{width: '8vw', height: 'auto', alignSelf: 'center'}} className='' alt='' src={require('../images/TempLocation.png')}/>
                        <p style={{fontSize: '1.1em', fontWeight: 700, marginLeft: '5vw'}}>Slutposition: {roomData.RoomCode}</p>
                    </div>
                    
                    <div className='arrowDiv' >
                        <img style={{width: '5vw', alignSelf: 'center'}} className='' alt='' src={require('../images/TempArrow.png')}/>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    )
}


export default NavigationScreen;