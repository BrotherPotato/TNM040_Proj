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

                <div class="slidecontainer">
                    <input type="range" min="1" max="5" value="1" class="slider" id="myRange" />
                </div>
            </div>
        </div>
    )
}



export default FloorSelection;