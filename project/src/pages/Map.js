import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function Map(){
    const House = useParams().House
    const Floor = useParams().Floor
    const navigate = useNavigate();

    function setMapFilterVisible(){
        if(document.getElementById("grayOverlay").style.display === "none"){
            document.getElementById("grayOverlay").style.display = "block"
            document.getElementById("mapFilterOptions").style.display = "block"
        } else {
            document.getElementById("grayOverlay").style.display = "none"
            document.getElementById("mapFilterOptions").style.display = "none"
        }
    }

    function setMapFloorVisible(){
        if(document.getElementById('grayMapOverlay').style.display === 'none'){
            document.getElementById('grayMapOverlay').style.display = 'block'
            document.getElementById('mapFloorSelection').style.display = 'flex'
            document.getElementById('bluePart').style.display = 'flex'
            availableFloors(House)
            changeBluePart(Floor)
        } else {
            document.getElementById('grayMapOverlay').style.display = 'none'
            document.getElementById('mapFloorSelection').style.display = 'none'
            document.getElementById('bluePart').style.display = 'none'
        }
        
    }
    function availableFloors(currentHouse){
        if(currentHouse === 'Täppan'){
            document.getElementById('floor2').style.display = 'none';
        }
        else if(currentHouse === 'Kåkenhus'){
            // show all floors
        }
    }

    function changeBluePart(currentFloor){
        let targetNumber = document.getElementById('floor' + currentFloor)
        let bound1 = targetNumber.getBoundingClientRect()
        let whiteDiv = document.getElementById('mapFloorSelection');
        let bound2 = whiteDiv.getBoundingClientRect()
        //console.log(bound1.top)
        //console.log(bound2.right)
        //console.log( (window.screen.width - bound2.right) )
        document.getElementById('bluePart').style.top = bound1.top + 'px'
        document.getElementById('bluePart').style.right = (window.screen.width - bound2.right) + 'px'
        document.getElementById('nrFloor').innerText = currentFloor
    }

    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{House} våning {Floor}</h1>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate('../')}/>
            </div>
            <div className='map'>   
            <div className='mapButtonCol1'>
                <div className='mapButton' onClick={() => navigate(-1)}> 
                    <img className='centerMapImg' alt="Center Map" src={require('../images/TempCenterMap.png')}/>
                </div>
                <div className='mapButton' onClick={() => setMapFilterVisible()}>
                    <img className='mapOptions' alt="Map Filter" src={require('../images/TempEye.png')}/>
                </div>
            </div>
            <div className='mapButtonCol2'>
                <div className='mapButton' onClick={() => setMapFloorVisible()}>
                    <img className='mapLayer' alt="Map Layer" src={require('../images/TempLayer.png')}/>
                </div>
                <div className='mapButton' onClick={() => navigate('/Search')}>
                    <img className='mapSearch' alt="Map Search" src={require('../images/TempSearch.png')}/>
                </div>
            </div>
            </div>
            <div id="grayOverlay" style={{display: 'none'}} onClick={() => setMapFilterVisible()}></div>
            <div id='mapFilterOptions' style={{display: 'none'}}>
                <h3>Visa:</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><img className='optionImage' src={require('../images/TempCafe.png')} alt='Cafée bild'/></td>
                            <td><p style={{display: 'inline', margin:'1em'}}>Caféer &emsp;</p></td>
                            <td>
                                <label className="switch">
                                        <input type='checkbox'/>
                                <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><img className='optionImage' src={require('../images/TempKitchen.png')} alt='Kök bild'/></td>
                            <td><p style={{display: 'inline', margin:'1em'}}>Studentkök &emsp;</p></td>
                            <td>
                                <label className="switch">
                                        <input type='checkbox'/>
                                <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><img className='optionImage' src={require('../images/TempPrinter.png')} alt='Skrivare bild'/></td>
                            <td><p style={{display: 'inline', margin:'1em'}}>Skrivare &emsp;</p></td>
                            <td>
                                <label className="switch">
                                        <input type='checkbox'/>
                                <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><img className='optionImage' src={require('../images/TempStairs.png')} alt='Trappa bild'/></td>
                            <td><p style={{display: 'inline', margin:'1em'}}>Trappor &emsp;</p></td>
                            <td>
                                <label className="switch">
                                        <input type='checkbox'/>
                                <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><img className='optionImage' src={require('../images/TempElevator.png')} alt='Hiss bild'/></td>
                            <td><p style={{display: 'inline', margin:'1em'}}>Hissar &emsp;</p></td>
                            <td>
                                <label className="switch">
                                        <input type='checkbox'/>
                                <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id='grayMapOverlay' style={{display: 'none'}} onClick={() => setMapFloorVisible()}></div>
            {/* 
            <div id='mapFloorSelection' style={{display: 'none'}}> 
                <h3>Välj våning:</h3>
                <Link to={'/Map/'+ House + '/1'}>
                    <button className='mapButton' onClick={() => setMapFloorVisible()}>1</button>
                </Link>
                <Link to={'/Map/'+ House + '/2'}>
                    <button className='mapButton' onClick={() => setMapFloorVisible()}>2</button>
                </Link>
                <Link to={'/Map/'+ House + '/3'}>
                    <button className='mapButton' onClick={() => setMapFloorVisible()}>3</button>
                </Link>
                <Link to={'/Map/'+ House + '/4'}>
                    <button className='mapButton' onClick={() => setMapFloorVisible()}>4</button>
                </Link>
                <Link to={'/Map/'+ House + '/5'}>
                    <button className='mapButton' onClick={() => setMapFloorVisible()}>5</button>
                </Link>
                <Link to={'/Map/'+ House + '/6'}>
                    <button className='mapButton' onClick={() => setMapFloorVisible()}>6</button>
                </Link>
            </div>
            */}
            <div id='mapFloorSelection' className='whitePart' style={{display: 'none'}}>
                {/* 
                <Link to={'/Map/'+ House + '/1'}>
                    <div className='floorNumber' id='floor1' onClick={() => setMapFloorVisible()}>1</div>
                </Link>
                */}
                <Link to={'/Map/'+ House + '/5'} className='linkCSS'>
                    <div className='floorNumber' id='floor5' onClick={() => setMapFloorVisible()}>5</div>
                </Link>
                <Link to={'/Map/'+ House + '/4'} className='linkCSS'>
                    <div className='floorNumber' id='floor4' onClick={() => setMapFloorVisible()}>4</div>
                </Link>
                <Link to={'/Map/'+ House + '/3'} className='linkCSS'>
                    <div className='floorNumber' id='floor3' onClick={() => setMapFloorVisible()}>3</div>
                </Link>
                <Link to={'/Map/'+ House + '/2'} className='linkCSS'>
                    <div className='floorNumber' id='floor2' onClick={() => setMapFloorVisible()}>2</div>
                </Link>
            </div>
            <div id='bluePart' style={{display: 'none'}}>
                <h2 style={{margin: '0px', marginRight: '1em'}}>Våning: </h2>
                <h2 id='nrFloor' style={{margin: '0px'}}> 1</h2>
            </div>
        </div>
    )
}

export default Map;