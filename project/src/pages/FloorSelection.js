import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function FloorSelection(){
    const House = useParams().House;
    const navigate = useNavigate();

    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>Floor Selection</h1>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div className='floorSelection'>
                <div className='floors'>
                    <h2>Välj våning:</h2>
                    <Link to={'/Map/'+ House + '/2'}>
                        <button className='floorButton'>2</button>
                    </Link>
                    <Link to={'/Map/'+ House + '/3'}>
                        <button className='floorButton'>3</button>
                    </Link>
                    <Link to={'/Map/'+ House + '/4'}>
                        <button className='floorButton'>4</button>
                    </Link>
                    <Link to={'/Map/'+ House + '/5'}>
                        <button className='floorButton'>5</button>
                    </Link>
                    <Link to={'/Map/'+ House + '/6'}>
                        <button className='floorButton'>6</button>
                    </Link>
                </div>
                <div className='houseFloor'>
                    <img className='houseImg' src={require('../images/TempHouse.jpg')} alt='Täppan'/>
                </div>
            </div>
        </div>
    )
}



export default FloorSelection;