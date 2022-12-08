import React from 'react'
import { Link } from 'react-router-dom'

function Home(){
 return(
    <div className='parent'>
        <div className='LogoTextBox'>
            <h1>edu.Vilse</h1> 
        </div>
        <div className='houseChoice'>
            <div className='houseOne'>
                <Link className='HouseLink' to={'/FloorSelection/Kåkenhus'}>
                    <h2>Kåkenhus</h2>
                    <img className='houseImg' src={require('../images/TempHouse.jpg')} alt='Kåkenhus'/>
                    <img className='mapImg' src={require('../images/TempButton.jpg')} alt='Image Button'/>
                </Link>
            </div>
             
            <div className='houseTwo'>
                <Link className='HouseLink' to={'/FloorSelection/Täppan'}>
                    <h2>Täppan</h2>
                    <img className='houseImg' src={require('../images/TempHouse.jpg')} alt='Täppan'/>
                    <img className='mapImg' src={require('../images/TempButton.jpg')} alt='Image Button'/>
                </Link>
            </div> 
        </div>
        <div className='SearchBar'>
            <Link className='SearchLink' to={'/Search'}>
                <input
                    id='homeInput'
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