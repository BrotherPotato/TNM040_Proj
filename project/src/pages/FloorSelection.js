import React from 'react'
import { Link } from 'react-router-dom'


function FloorSelection({floor}){
    return(
        <div className='parent'>
            <div className='topBar'>
                <h1 style={{color: '#FFFFFF'}}>Floor Selection</h1>
                <Link to='/'>
                    <button style={{marginLeft:'10em'}}>(placeholder kryss)</button>
                </Link>
            </div>
            <div className='floorSelection'>
                <h2>Välj våning</h2>
                <div>
                    <div>
                        <Link to={'/Search/'+ floor + '1'}>
                            <button className='floorButton'>1</button>
                        </Link>
                        <Link to={'/Search/'+ floor + '2'}>
                            <button className='floorButton'>2</button>
                        </Link>
                        <Link to={'/Search/'+ floor + '3'}>
                            <button className='floorButton'>3</button>
                        </Link>
                        <Link to={'/Search/'+ floor + '4'}>
                            <button className='floorButton'>4</button>
                        </Link>
                        <Link to={'/Search/'+ floor + '5'}>
                            <button className='floorButton'>5</button>
                        </Link>
                    </div>
                    <div>
                        <img className='houseImg' src={require('../images/TempHouse.jpg')} alt='Täppan'/>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default FloorSelection;