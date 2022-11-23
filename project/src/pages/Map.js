import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function Map(){
    const House = useParams().House
    const Floor = useParams().Floor
    const navigate = useNavigate();

    function setMapFilterVisible(){
        if(document.getElementById('mapFilterOptions').style.display === 'none'){
            document.getElementById('mapFilterOptions').style.display = 'block'
        } else {
            document.getElementById('mapFilterOptions').style.display = 'none'
        }
    }

    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{House} Våning: {Floor}</h1>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div className='map'>   

            </div>
            <div className='mapButton' onClick={() => navigate(-1)}> 
                <img className='centerMapImg' alt="Center Map" src={require('../images/TempCenterMap.png')}/>
            </div>
            <div className='mapButton' onClick={() => setMapFilterVisible()}>
                <img className='mapOptions' alt="Map Filter" src={require('../images/TempEye.png')}/>
            </div>
            <div className='mapButton' onClick={() => navigate(-1)}>
                <img className='mapLayer' alt="Map Layer" src={require('../images/TempLayer.png')}/>
            </div>
            <div className='mapButton' onClick={() => navigate(-1)}>
                <img className='mapSearch' alt="Map Search" src={require('../images/TempSearch.png')}/>
            </div>

            <div id='mapFilterOptions' style={{display: 'none'}}>
                <p>Visa:</p>
                <img className='optionImage' src={require('../images/TempCafe.png')} alt='Cafée bild'/>
                <img className='optionImage' src={require('../images/TempKitchen.png')} alt='Kök bild'/>
                <img className='optionImage' src={require('../images/TempPrinter.png')} alt='Skrivare bild'/>
                <img className='optionImage' src={require('../images/TempStairs.png')} alt='Trappa bild'/>
                <img className='optionImage' src={require('../images/TempElevator.png')} alt='Hiss bild'/>
            </div>

            <div id='mapFloorSelection' style={{display: 'none'}}> 
                <Link to={'/Map/'+ House + '/' + Floor + '/1'}>
                    <button className='mapButton'>1</button>
                </Link>
                <Link to={'/Map/'+ House + '/' + Floor + '/2'}>
                    <button className='mapButton'>2</button>
                </Link>
                <Link to={'/Map/'+ House + '/' + Floor + '/3'}>
                    <button className='mapButton'>3</button>
                </Link>
                <Link to={'/Map/'+ House + '/' + Floor + '/4'}>
                    <button className='mapButton'>4</button>
                </Link>
                <Link to={'/Map/'+ House + '/' + Floor + '/5'}>
                    <button className='mapButton'>5</button>
                </Link>
                <Link to={'/Map/'+ House + '/' + Floor + '/6'}>
                    <button className='mapButton'>6</button>
                </Link>
            </div>
            
        

        </div>
    )
}

export default Map;