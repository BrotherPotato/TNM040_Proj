import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';

function Map(){
    const House = useParams().House
    const Floor = useParams().Floor
    const navigate = useNavigate();

    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF', display: 'inline-block'}}>{House} Våning: {Floor}</h1>
                <img className='CloseImg' alt="Close Button" src={require('../images/TempKryss.png')} onClick={() => navigate(-1)}/>
            </div>
            <div className='map'>   </div>
            <div className='centerMap'> 
            
            </div>
            <div className='mapOptions'>
                <p>Visa:</p>
            </div>

            <div className='mapButtons'> 
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