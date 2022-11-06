import React from 'react'
import { Link } from 'react-router-dom'

function Home(){
 return(
    <div className='parent'>
        <div className='LogoTextBox'>
            <h1>LiTHe Vilse (trademark pending)</h1> 
        </div>
        <div className='HouseChoice'>

        </div>
        <div className='SearchBar'>
            <Link className='SearchLink' to={'/Search'}>
                <input
                    type='text'
                    label='Sök efter lokal: '
                    placeholder='Sök efter lokal...'
                />
            </Link>
        </div>
    </div>
 )
}

export default Home;