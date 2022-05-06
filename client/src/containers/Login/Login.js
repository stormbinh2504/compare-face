import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../ultils/imageUpload'

import { sdkVNPTService, authService } from '../../services';
import axios from 'axios';

const Login = () => {

    const [userData, setUserData] = useState({
        "username": "binhhuun",
        "password": "123456",
    })

    const [dataLogin, setDataLogin] = useState()


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const comparetwoFaces = async () => {

        let body = {
            hash: "idg20220506-d0d3238d-6720-3187-e053-62199f0ac777/IDG01_7f9d26ca-cd17-11ec-aaa4-b9e0af3ed133",
            id_card: "001200042709",
            id_type: "CARD_ID",
            unit: ""
        }

        await sdkVNPTService.comparetwoFaces(body)
            .then((responses) => {
                console.log("binh---1", responses)
            })
            .catch((error) => {

            });
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

        setDataLogin(data.user)

        await comparetwoFaces()
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
            {dataLogin && <span>
                <img src={dataLogin.avatar}></img>
            </span>}
        </div >
    )
}

export default Login