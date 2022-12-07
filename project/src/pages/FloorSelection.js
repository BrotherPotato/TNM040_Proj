import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function FloorSelection(){
    const House = useParams().House;
    const navigate = useNavigate();

    function availableFloors(currentHouse){
        if(currentHouse === 'Täppan'){
            document.getElementById('floor2').style.display = 'none';
        }
        else if(currentHouse === 'Kåkenhus'){
            // show all floors :)
        }
    }
    return(
        <div className='parent' onLoad={() => availableFloors(House)}>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF', display: 'inline'}}>{House}</h1>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <h2 style={{color: '#FFFFFF', marginLeft: '2em', marginTop:'5em'}}>Välj våning: </h2>
            <div className='Selection'>
                <div id='mapFloorSelection' className='whitePartFloorSelect'>
                    <Link to={'/Map/'+ House + '/5'} className='linkCSS'>
                        <div className='floorNumber' id='floor5'>5</div>
                    </Link>
                    <Link to={'/Map/'+ House + '/4'} className='linkCSS'>
                        <div className='floorNumber' id='floor4'>4</div>
                    </Link>
                    <Link to={'/Map/'+ House + '/3'} className='linkCSS'>
                        <div className='floorNumber' id='floor3'>3</div>
                    </Link>
                    <Link to={'/Map/'+ House + '/2'} className='linkCSS'>
                        <div className='floorNumber' id='floor2'>2</div>
                    </Link>
                </div>
                <div className='houseFloorFloorSelect'>
                        <img src={require('../images/TempHouse.jpg')} alt='Täppan'/>
                </div>
            </div>
        </div>
    )
}



export default FloorSelection;