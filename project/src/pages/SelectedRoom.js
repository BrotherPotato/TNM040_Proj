import React from 'react'
import { Link, useNavigate } from 'react-router-dom'




const SelectedRoom = () => {
    const navigate = useNavigate();
    return(
        <div>
            <Link to={'/'}>
                    <h3>Link to home page </h3>
            </Link>
            <div className='topBar'>
                <h2 style={{color: '#FFFFFF'}}>Selected Room</h2>
                <button style={{marginLeft:'10em'}} onClick={() => navigate(-1)}>(placeholder kryss)</button>
            </div>

        </div>
    )
}

export default SelectedRoom