import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./Header.scss"
const Header = () => {
    const history = useHistory()
    const HandleLogout = () => {
        // history.push("/")
        window.location.pathname = "/"
    }
    return (
        <div className='header'>
            <button onClick={HandleLogout} type="button" class="btn btn-info">Logout</button>
        </div>
    )
}

export default Header