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
                <Link to='/Search'>
                    <button className='floorButton'>Våning 1</button>
                </Link>
                <Link to='/Search'>

                    <button className='floorButton'>Våning 2</button>
                </Link>
                <Link to='/Search'>
                    <button className='floorButton'>Våning 3</button>
                </Link>
                <Link to='/Search'>
                    <button className='floorButton'>Våning 4</button>
                </Link>
                <Link to='/Search'>
                    <button className='floorButton'>Våning 5</button>
                </Link>
                <Link to='/Search'>
                    <button className='floorButton'>Våning 6</button>
                </Link>
            </div>
        </div>
    )
}



export default FloorSelection;