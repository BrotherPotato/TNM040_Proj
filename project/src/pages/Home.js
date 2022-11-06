import React from 'react'
import { Link } from 'react-router-dom'



function Home(){
 return(
    <div className='parent'>
        <div className='LogoTextBox'>
            <h1>LiTHe Vilse (trademark pending)</h1> 
        </div>
        <div className='houseChoice'>
            <div className='houseOne'>
                <Link className='HouseLink' to='/Search'>
                    <h2>Kåkenhus</h2>
                    <img src={require('../images/TempHouse.jpg')} alt='Kåkenhus'/>
                    <img src={require('../images/TempButton.jpg')} alt='Image Button'/>
                </Link>
            </div>
             
            <div className='houseTwo'>
                <Link className='HouseLink' to='/Search'>
                    <h2>Täppan</h2>
                    <img src={require('../images/TempHouse.jpg')} alt='Täppan'/>
                    <img src={require('../images/TempButton.jpg')} alt='Image Button'/>
                </Link>
            </div> 
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