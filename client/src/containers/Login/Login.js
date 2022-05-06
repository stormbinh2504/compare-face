import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../ultils/imageUpload'

import { sdkVNPTService, authService } from '../../services';
import axios from 'axios';

const Login = () => {

    const [userData, setUserData] = useState({
        "username": "binhhuun",
        "password": "123456",
    })

    const [avatar, setAvatar] = useState(null)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const Submit = async () => {


        let body = {
            ...userData,
        }
        // await authService.LoginClient(body)
        //     .then(data => {
        //         console.log("binh---data", data)
        //     }).catch((e) => {
        //         console.log(e)
        //     })


        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `http://localhost:5000/api/login`,
            body,
            config
        );
    }
    return (
        <div div className='regiter-login' >
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username"
                    onChange={handleChangeInput} value={userData.username}
                />
            </div>

            <div className="form-group">
                <label htmlFor="username">password</label>
                <input type="text" className="form-control" id="password"
                    onChange={handleChangeInput} value={userData.password}
                />
            </div>

            <button onClick={Submit}>Submit</button>
        </div >
    )
}

export default Login